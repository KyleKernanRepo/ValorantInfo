
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
      let counter = 1;
       let score = 0;
      let sortScore = 0;

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
        message: messageContact.value


      });
      alert("Submitted")
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
         const txtUsername = document.getElementById('Username');
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
       username: document.getElementById("Username").value,
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
    
    function Next()
    {
     
       counter++;
       var test = counter -1;

       const database = firebase.database();
       const user = firebase.auth().currentUser;
      
       var ele = document.getElementsByName('radio');
       let CorrectOption = "test"; 

            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked)
                {
                 

                  CorrectOption = ele[i].value;
                   console.log(CorrectOption);
                  database.ref('/users/' + user.uid).on('value', function(snapshot){

                  const agents = snapshot.val().agents;
                  database.ref('/Quiz/Agents/' + agents + '/' + test.toString()).on('value', function(snapshot){
                        

                        if (CorrectOption == snapshot.val().CorrectOption) {

                          score++;
                          
                          

                        }
                  });
                });
                }
            }


      database.ref('/users/' + user.uid).on('value', function(snapshot){
        const agents = snapshot.val().agents;
        
      const Question = document.getElementById("Question");
      const Option1 = document.getElementById("Option1");
      const Option2 = document.getElementById("Option2");
      const Option3 = document.getElementById("Option3");
      const Option4 = document.getElementById("Option4");
     
    

     
         database.ref('/Quiz/Agents/' + agents + '/' + counter.toString()).on('value', function(snapshot){
          Question.innerHTML = snapshot.val().Question;
          Option1.innerHTML = snapshot.val().Option1;
           Option2.innerHTML = snapshot.val().Option2;
            Option3.innerHTML = snapshot.val().Option3;
             Option4.innerHTML = snapshot.val().Option4;
             

         


         });



      });
     

      
   
      
       
    }

    function SubmitQuiz()
    {
     const user = firebase.auth().currentUser;
     sortScore = 0 - score;
     var username = "";
     database.ref('users/' + user.uid).on('value', function(snapshot){
      username = snapshot.val().username;


     });

      database.ref('/Quiz/users/' + user.uid).set({
        score: score,
        username: username,
        sortScore: sortScore

      });
      alert("SubmitQuiz");

    }

     function SignOut(){

      firebase.auth().signOut().then(() => {
        alert("Signed Out")
      });

     }


     function addItemstoLeaderboard(username, score)
     {
     /* var tr = document.getElementById('highscoreUser');
      var tj = document.getElementById('highscoreScore');
      var _score = document.createElement('li');
      var _username = document.createElement('li');

      console.log(username);
      _username.innerHTML = 'Name = ' + username;
      _score.innerHTML = 'Score = ' + score;
      tr.appendChild(_username);
      tj.appendChild(_score);

*/
     
      var tbody = document.getElementById('testbody');
      var tr = document.createElement('tr');
      var tduser = document.createElement('td');
      var tdscore = document.createElement('td');
      tduser.innerHTML = username;
      tdscore.innerHTML = score;
      tr.appendChild(tduser);
      tr.appendChild(tdscore);
      tbody.appendChild(tr);
     



     }

     function highscoreBoard()
     {


      database.ref('Quiz/users').orderByChild('sortScore').once('value', function(snapshot){
        
        
         alert("test");

        snapshot.forEach(
        function(childSnapshot)
        {
         

          let username = childSnapshot.val().username;
          let score = childSnapshot.val().score;
          addItemstoLeaderboard(username, score);
          

        });


      });

     
    

    
     }




    

    


      
          
