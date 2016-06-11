// App specific
var identityPoolId = 'us-east-1:35b6094e-ff5b-44a5-ac52-e879ae263c91';
var userPoolId = 'us-east-1_9n2I4LpaH';//'us-east-1_fgCWraBkF';
var appClientId = '4s9cfpggqrsqgccachl12en215';//'57lq262n28o7ddt8i36jcjj7qd';
var region = 'us-east-1';

// constructed
var loginId = 'cognito-idp.' + region + '.amazonaws.com/' + userPoolId;
var pool = {
   UserPoolId: userPoolId,
   ClientId: appClientId
};

function registerUser(user)
{
   // Required as mock data
   AWSCognito.config.update({accessKeyId: 'mock', secretAccessKey: 'mock'});

   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(pool);

   var attributes = [];

   var emailData = {
      Name: 'email',
      Value: user.email
   };

   var nameData = {
      Name: 'name',
      Value: user.name
   };

   attributes.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(emailData));
   attributes.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(nameData));

   userPool.signUp(user.username, user.password, attributes, null, function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      alert('User ' + user.username + ' Created')
   });
}

function confirmUser(username, code)
{
   // Required as mock data
   AWSCognito.config.update({accessKeyId: 'mock', secretAccessKey: 'mock'});

   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(pool);

   var userData = {
      Username: username,
      Pool: userPool
   };

   var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

   cognitoUser.confirmRegistration(code, true, function (err, result){
      if (err) {
         console.log(err);
         return;
      }
      alert('User ' + username + '  Confirmed');
   });
}

function loginUser(username, password)
{
   // Required as mock data
   AWSCognito.config.update({accessKeyId: 'mock', secretAccessKey: 'mock'});

   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(pool);

   var authenticationData = {
      Username: username,
      Password: password
   };

   var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

   var userData = {
      Username: username,
      Pool: userPool
   };

   var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

   cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
         alert(username + ' Logged In');
      },
      onFailure: (err) => {
         console.log(err);
      }
   });
}

function getSession()
{
   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(pool);

   var cognitoUser = userPool.getCurrentUser();

   if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session){
         if (err) {
            logoutUser();
            return;
         }
         $('.session').text(session.getIdToken().getJwtToken());
      });
   }
   else logoutUser();
}

function logoutUser()
{
   var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(pool);
   var cognitoUser = userPool.getCurrentUser();
   alert('Logged Out');
   if (cognitoUser != null) cognitoUser.signOut();
}

/* Helper Functions */

function setCredentials(token)
{
   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
      Logins: {}
   });
   AWS.config.credentials.params.Logins[loginId] = token;
}
