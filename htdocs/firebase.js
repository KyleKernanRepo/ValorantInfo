
        const firebaseConfig = {
      apiKey: "AIzaSyBdlQZPipEKwX2tC6sNfVjUyjIBjJZSGzk",
      authDomain: "valorantinfo-1e192.firebaseapp.com",
      databaseURL: "https://valorantinfo-1e192-default-rtdb.firebaseio.com",
      projectId: "valorantinfo-1e192",
      storageBucket: "valorantinfo-1e192.appspot.com",
        messagingSenderId: "234092627059",
        appId: "1:234092627059:web:43f2225955a1fd2214d606",
      measurementId: "G-WQCQ2NYEDG"
    };
     // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
     const auth = firebase.auth();
     const database = firebase.database();

      const txtUsername = document.getElementById('Username');
      const txtPassword = document.getElementById('Password');
      const txtEmail = document.getElementById('Email');
      const btnSignUp = document.getElementById('SignUpButton');
      const btnSignIn = document.getElementById('SignInButton');
//    const btnLogOut = document.getElementById('LogOutButton');

       //btnSignIn.addEventListener('click', e => {

      //   const Email = txtEmail.value;
      //   const Password = txtPassword.value;
      //   const auth = firebase.auth();

      //   const promise = auth.signInWithEmailAndPassword(Email, Password);
      //   promise.catch (e => console.log(e.message));
      // });




     function SubmitContactInfo()
     {
      const nameContact = document.getElementById("nameContact")
      const emailContact = document.getElementById("emailContact")
      const phoneContact = document.getElementById("phoneContact")
      const messageContact = document.getElementById("messageContact")

      database.ref('/Contact/').push().set({
        name: nameContact.value,
        email: emailContact.value,
        phone: phoneContact.value,
        message: messageContact.value,


      });
     }

      function SignIn(){

        const txtPassword = document.getElementById('Password');
         const txtEmail = document.getElementById('Email');
        const promise = auth.signInWithEmailAndPassword(txtEmail.value, txtPassword.value);
         promise.then(() => {alert("Signed In")
       });
    
    }

     function SignUp(){

        const txtPassword = document.getElementById('Password');
         const txtEmail = document.getElementById('Email');
         const selcAgents = document.getElementById('AgentPicker');
         const selcRank = document.getElementById('RankPicker');

        const promise = auth.createUserWithEmailAndPassword(txtEmail.value, txtPassword.value);
        promise.then(() =>  { const userID =
         firebase.auth().currentUser.uid;
        WriteUserData(userID);
         alert("Signed Up");
      });
     }

     function WriteUserData(userID){

       const database = firebase.database();
       database.ref('/users/' + userID).set({
       email: document.getElementById("Email").value,
       password: document.getElementById('Password').value,
       agents: document.getElementById('AgentPicker').value,
       ranks: document.getElementById('RankPicker').value
      
     });
     }

     function myAgent(){
      const user = firebase.auth().currentUser;
      if (user) {

         const database = firebase.database();
      database.ref('/users/' + user.uid).on('value', function(snapshot){
        const agents = snapshot.val().agents;
        if (agents == "Jett") {
          window.location = "jett.html";
        }
         else if (agents == "Raze") {
          window.location = "raze.html";
        }
         else if (agents == "Reyna") {
          window.location = "reyna.html";
        }
         else if (agents == "Yoru") {
          window.location = "yoru.html";
        }
         else if (agents == "Phoenix") {
          window.location = "phoenix.html";
        }
         else if (agents == "Sage") {
          window.location = "sage.html";
        }
         else if (agents == "Cypher") {
          window.location = "cypher.html";
        }
         else if (agents == "Killjoy") {
          window.location = "killjoy.html";
        }
         else if (agents == "Sky") {
          window.location = "sky.html";
        }
         else if (agents == "Breach") {
          window.location = "breach.html";
        }
         else if (agents == "Sova") {
          window.location = "sova.html";
        }
         else if (agents == "Brimstone") {
          window.location = "brimstone.html";
        }
         else if (agents == "Omen") {
          window.location = "omen.html";
        }
         else if (agents == "Viper") {
          window.location = "viper.html";
        }
        else{
          alert("no agent");
        }
       
      });
        
      }
      else{
        alert("no user");
      }
     
     }
    

     function SignOut(){

      firebase.auth().signOut().then(() => {
        alert("Signed Out")
      });

     }

      //   firebase.auth().onAuthStateChanged(firebaseUser => {
      //     if(firebaseUser){
      //       console.log(firebaseUser);
      //     } else {
      //       console.log('not logged in');
      //     }

      // });

      // btnLogOut.addEventListener('click',e =>{
      //  firebase.auth().signOut();
      // });
     

          
