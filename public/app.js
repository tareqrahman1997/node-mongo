
(function(){
    const config = {
        apiKey: "AIzaSyAyrFmvp1zWtLFuGODj6S_8_8a9Jk6fK2w",
        authDomain: "node-d721f.firebaseapp.com",
        databaseURL: "https://node-d721f.firebaseio.com",
        projectId: "node-d721f",
        storageBucket: "node-d721f.appspot.com",
        messagingSenderId: "584904507173",
        appId: "1:584904507173:web:e4d171b7d6a6e6fd8fe4cc",
        measurementId: "G-6R5PGE8R61"
      };
      firebase.initializeApp(config);
    
      //get elements
      const txtEmail = document.getElementById('txtEmail');
      const txtPassword = document.getElementById('txtPassword');
      const btnLogin = document.getElementById('btnLogin');
      const btnSignUp = document.getElementById('btnSignUp');
      const btnLogout = document.getElementById('btnLogout');
    
    
      //add login even
      btnLogin.addEventListener('click',e =>{
          //get email and pass
          const email = txtEmail.value;
          const pass = txtPassword.value;
          const auth = firebase.auth();
          //sign in
          const promise = auth.signInWithEmailAndPassword(email, password);
          promise.catch(e =>console.log(e.message));
      });
    
      //add singUp even
      btnSignUp.addEventListener('click',e =>{
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //sign in
        const promise = auth.creatUserWithEmailAndPassword(email, password);
        promise
         .catch(e =>console.log(e.message));
      });

      btnLogout.addEventListener('click',e =>{
          firebase.auth().signOut();

      });



      firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebase){
              console.log(firebaseUser);
              btnLogout.classList.remove('hide');
          }else{
              console.log('not logged in');
              btnLogout.classList.add('hide');
          }
      });

})