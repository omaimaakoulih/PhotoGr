import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize, from, map, Observable, shareReplay, switchMap, take, tap } from 'rxjs';
import { LikeAction } from '../models/likeAction';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { UserModel } from '../models/usermodel';
import { SaveAction } from '../models/saveAction';
import firebase from 'firebase/compat/app';
import { FormGroup } from '@angular/forms';
import { ref, uploadBytes ,Storage, getDownloadURL} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  

  constructor(private angularFireAuth:AngularFireAuth, private router:Router, private rout:ActivatedRoute, private toast:ToastController, private firestore:Firestore,  private storage:Storage) { }
  


  async signIn(email:string, password:string){
    try{
    await this.angularFireAuth.signInWithEmailAndPassword(email,password).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.user));
       });
      }catch(error){
        const toast =  await this.toast.create({
          message: 'invalid email or password !',
          duration: 1500,
          position: 'bottom'
        });
    
         (await toast).present();
      }

  }

  async signUp(email:string, password:string, confirmPassword: string, userName:string){

    if(password == confirmPassword){
    await this.angularFireAuth.createUserWithEmailAndPassword(email,password).then((res) => {
      res.user?.updateProfile({
        displayName: userName,
        photoURL: "https://firebasestorage.googleapis.com/v0/b/photogr-9e160.appspot.com/o/users%2Fprofile.png?alt=media&token=62d766ce-e6bf-43fb-a097-ae7227ec5ecf"
      });
      localStorage.setItem('user', JSON.stringify(res.user));
      //console.log(new UserModel(res.user?.uid, userName, "https://firebasestorage.googleapis.com/v0/b/photogr-9e160.appspot.com/o/users%2Fprofile.png?alt=media&token=62d766ce-e6bf-43fb-a097-ae7227ec5ecf"));
        const collectionData = collection(this.firestore, 'user');
        addDoc(collectionData, JSON.parse(JSON.stringify(new UserModel(res.user?.uid, userName,email, "https://firebasestorage.googleapis.com/v0/b/photogr-9e160.appspot.com/o/users%2Fprofile.png?alt=media&token=62d766ce-e6bf-43fb-a097-ae7227ec5ecf")))).then(
        () => {
          console.log("user created !");
        }
      ).catch((err) => {
        console.log(err);
      })
    })
    
   }
   else{
    const toast =  await this.toast.create({
      message: 'invalid password !',
      duration: 1500,
      position: 'bottom'
    });

     (await toast).present();
   }
  }

  getPosts(): Observable<Post[]> {
    let posts: Post[] = [];
    let post!: Post;
    const collectionInstance = collection(this.firestore, 'posts');
    
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map((val) => {
        val.forEach(v => {
          post = new Post(v['userId'], v['description'], v['date'], v['likes'], v['image']);
          post.setPostId(v['id']);
          post.saved = v['saved'];
          if(!posts.some((s) =>s.postId == post.postId && s.userId == post.userId && s.description == post.description && s.date== post.date && post.likes == s.likes && s.image == post.image)){
            posts.push(post);
          }
          
        });
        return posts;
      })
    );
  }

   onLikePost(post: Post, uid: string, likedActions: LikeAction[]) {
    let likedAction: LikeAction| undefined = likedActions.find(action => action.postId === post.postId && action.uid === uid);
    console.log("test service");
    console.log(likedAction);
    if (!likedAction) {
      // user has not liked the post before
      likedAction = new LikeAction(post.postId, uid, true);
      addDoc(collection(this.firestore, 'likedActions'), JSON.parse(JSON.stringify(likedAction)))
        .then(() => {
          console.log("liked Action aded to th db!");
          // increment likes 
          post.likes++;
          updateDoc(doc(this.firestore, 'posts', post.postId), { likes: post.likes,color:"danger"})
            .then(() => {
              console.log("post updated!");
            })
            .catch((err: any) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
  
    } else {
      // user has already liked the post, toggle the like
      const liked = !likedAction.liked;
      updateDoc(doc(this.firestore, 'likedActions', likedAction.likeActionId!), { liked:liked })
        .then(() => {
          console.log("post like status updated!");
          if (liked) {
            post.likes++;
          } else {
            post.likes--;
          }
          updateDoc(doc(this.firestore, 'posts', post.postId), { likes: post.likes })
            .then(() => {
              console.log("post updated!");
            })
            .catch((err: any) => {
              console.log(err);
            });
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  getlikeActions(): Observable<LikeAction[]> {
    let likeActions: LikeAction[] = [];
    let likeAction!: LikeAction;
    const collectionInstance = collection(this.firestore, 'likedActions');
    
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map((val) => {
        val.forEach(v => {
          likeAction = new LikeAction(v['postId'], v['uid'], v['liked'],v['id']);
          
          if(!likeActions.some((s) =>s.postId == likeAction.postId && s.uid == likeAction.uid)){
            likeActions.push(likeAction);
            console.log("added");
          }
          
        });
        return likeActions;
      })
    );
  }


  onCommentPost(text:string,postId:string, userId:string){
    let comment:Comment = new Comment(text,postId,userId);

    const collectionData = collection(this.firestore, 'comments');
    addDoc(collectionData, JSON.parse(JSON.stringify(comment))).then(
      () => {
        console.log("commented !");
      }
    ).catch((err) => {
      console.log(err);
    })

  }

  getPostComments(postId:string):Observable<Comment[]>{
    let comments:Comment[] = [];
    let comment!:Comment;
    const collectioInstance = collection(this.firestore,'comments');
    return collectionData(collectioInstance,{idField:'id'}).pipe(
      map((val) => {
        val.forEach(v => {
          comment = new Comment(v['text'],v['idPot'],v['iduserComment']);
          if(!comments.some((c) => c.text == comment.text && c.idPot == comment.idPot && c.iduserComment == comment.iduserComment)){
            comments.push(comment);
          }
        });
        return comments;
      })
    )

  }

  getUserById(uid:string):Observable<UserModel>{
    let user!:UserModel;

    const collectionInstance = collection(this.firestore, 'user');
    
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map((val) => {
        val.forEach(v => {
          if(v['uid'] == uid){
            user = new UserModel(v['uid'],v['userName'],v['email'],v['image']);
          }
        });
        console.log("test observable");
        return user;
      })
    );
  }


  getsaveActions(): Observable<SaveAction[]> {
    let saveActions: SaveAction[] = [];
    let saveAction!: SaveAction;
    const collectionInstance = collection(this.firestore, 'savedActions');
    
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map((val) => {
        val.forEach(v => {
          saveAction = new SaveAction(v['postId'], v['uid'], v['saved'],v['id']);
          
          if(!saveActions.some((s) =>s.postId == saveAction.postId && s.uid == saveAction.uid)){
            saveActions.push(saveAction);
            console.log("added");
          }
          
        });
        return saveActions;
      })
    );
  }

  onSavePost(post: Post, uid: string, saveActions: SaveAction[]) {
    let saveAction: SaveAction| undefined = saveActions.find(action => action.postId === post.postId && action.uid === uid);
    console.log("test service");
    console.log(saveAction);
    if (!saveAction) {
      // user has not liked the post before
      saveAction = new SaveAction(post.postId, uid, true);
      addDoc(collection(this.firestore, 'savedActions'), JSON.parse(JSON.stringify(saveAction)))
        .then(()=>{

          updateDoc(doc(this.firestore, 'posts', post.postId), { saved : "bookmark-outline"})
            .then(async () => {
              const toast =  await this.toast.create({
                message: 'Post saved!',
                duration: 1500,
                position: 'top'
              });
          
              (await toast).present();
            })
            .catch((err: any) => {
              console.log(err);
            });

          
        })
         .catch((err) => {
          console.log(err);
        });
  
    } else {
      // user has already liked the post, toggle the like
      const saved = !saveAction.saved;
      const donInstance = doc(this.firestore, 'savedActions', saveAction.saveActionId!);
      updateDoc(donInstance, { saved:saved })
        .then( () => {
          console.log("post like status updated!");
          if (saved) {
            updateDoc(doc(this.firestore, 'posts', post.postId), { saved : "bookmark-outline"})
            .then(async () => {
              const toast =  await this.toast.create({
                message: 'Post saved!',
                duration: 1500,
                position: 'top'
              });
          
              (await toast).present();
            })
            .catch((err: any) => {
              console.log(err);
            });
          } else {
            deleteDoc(donInstance).then(()=>{
              updateDoc(doc(this.firestore, 'posts', post.postId), { saved : "bookmarks-outline"})
            .then(async () => {
              const toast =  await this.toast.create({
                message: 'Post saved!',
                duration: 1500,
                position: 'top'
              });
          
              (await toast).present();
            })
            .catch((err: any) => {
              console.log(err);
            });
          });
        }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  getNumberOfLikes(uid: string) : Observable<number[]>{

    let likes: number = 0;
    let posts : number = 0;
    const cllectionInstance = collection(this.firestore, 'posts');

    return collectionData(cllectionInstance, {idField: 'id'}).pipe(
      map((val) => {
        val.forEach((v) => {
          if(v['userId'] == uid){
            likes += v['likes'];
            posts += 1;
          }
        });
        return [posts, likes];
      })
    )
  }

  getuserPosts(uid:string): Observable<Post[]>{
    let posts :Post[] = [];
    let post!:Post;
    let collectionInstance = collection(this.firestore, 'posts');

    return collectionData(collectionInstance, {idField: 'id'}).pipe(
      map((val) => {
        val.forEach((v) => {
          if(v['userId'] == uid){
            post = new Post(v['userId'], v['description'], v['date'], v['likes'], v['image']);
            post.setPostId(v['id']);
            post.saved = v['saved'];
            if(!posts.some((s) =>s.postId == post.postId && s.userId == post.userId && s.description == post.description && s.date== post.date && post.likes == s.likes && s.image == post.image)){
              posts.push(post);
            }

          }
        });
        return posts;
      })
    )
  }

  getUserbyuid(uid:string): Observable<string>{
    let userId !:string;

    let collectionInstance = collection(this.firestore, 'user');
    return collectionData(collectionInstance, {idField: 'id'}).pipe(
      map((val) => {
        val.forEach((v) => {
          if(v['uid'] == uid){
            userId = v['id'];
          }
        });
        return userId;
      }), take(1)
    )
  }

  async change(user:firebase.User, form:FormGroup, selectedImage:File, ){

    let imageUrl!:string;
    let updatePassword:boolean = false;

      if(form.value.password == form.value.confPassword){
        if(form.value.password != '' && form.value.confPassword !=''){
           user.updatePassword(form.value.password);
        }

        // the email : 
        user.updateEmail(form.value.email);

        // the user Image : 
        if(selectedImage){
          const storageRef = ref(this.storage,`posts/images/${selectedImage.name}`);
          const uploadTask = from(uploadBytes(storageRef,selectedImage));

          uploadTask.pipe(
            
            switchMap((result) => from(getDownloadURL(result.ref))),
            tap((url) => {
              imageUrl = url;
              user.updateProfile({
                displayName: form.value.userName,
                photoURL: url
              }).then(()=> {
                console.log("udated !");
              });
            })).subscribe();
        }
        else{
          
          user.updateProfile({
            displayName: form.value.userName
          }).then(()=> {
            console.log("udated !");
          });
        }
        
        
        // changer les infos du user dans le document user.
        this.getUserbyuid(user.uid).subscribe((val) => {
          if(imageUrl){
          updateDoc(doc(this.firestore, 'user', val), { email: form.value.email, userName: form.value.userName, image: imageUrl}).then(() => {
            console.log("the document user is modified  !");
          }).catch((error) => {
            console.log(error);
          })}
          else{
            updateDoc(doc(this.firestore, 'user', val), { email: form.value.email, userName: form.value.userName}).then(() => {
              console.log("the document user is modified !");
            }).catch((error) => {
              console.log(error);
            })
          }
          
        })

        const toast =  await this.toast.create({
          message: 'successfully updated !',
          duration: 1500,
          position: 'top'
        });
    
        (await toast).present();
        
        
      }
      else{
       
              const toast =  await this.toast.create({
                message: 'invalid password !',
                duration: 1500,
                position: 'bottom'
              });
          
              (await toast).present();
          
        
      }

    
    
      
    
  }


  
  
  
}
