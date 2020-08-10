let responses = [];
const userResponsesSection = document.querySelector('#user-responses');

const fetchUserResponses = async () => {
  const response = await fetch(
    'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vTMByaSZBNIGdSLUj113klxRfQRBGjEU5LlIsDSLfsUo6zz8FXaWUVkil4wWC-Vn3m02HvuTuP0ELCQ/pub?output=csv'
  );
  const data = await response.text();
  const results = Papa.parse(data, { header: true });
  responses = results.data;
};

const renderUserResponse = userResponse => {
  const personsName = userResponse.Name;
  const hobbyName = userResponse['What is your favorite hobby?'];
  const hobbyTime = userResponse['How long have you been this hobby?'];
  const location = userResponse['Do you do this indoors or outdoors?'];
  const whyDoYouDoThis = userResponse['Why do you do this hobby?'];
  const cadence =
    userResponse['How often are you able to do/practice this hobby'];
  const description =
    userResponse[
      'Please provide a short description about why you enjoy this hobby.'
    ];
  const picturePlease =
    userResponse['Please upload a picture representing this hobby.'];
  const googlePhotoId = picturePlease.split('id=')[1];

  return `
  <div class = "user-response">
  <img src = "https://drive.google.com/thumbnail?id=${googlePhotoId}" alt = "Hobby picture"/>
  <h2>${personsName}</h2>
  <h3>My favorite hobby is ${hobbyName}<h3>
  <h4>I have been doing this for ${hobbyTime}<h4>
  <h4>Is this typically done indoors or outdoors? <strong>${location}</strong><h4>
  <h4>I am typically able to do this ${cadence}<h4>
  <p>Why do I enjoy this? ${description}<p>
  
  




  </div>
  `;
};
const fetchAndShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponsesHTML = eachUserResponseHTML.join('');
  userResponsesSection.innerHTML = allUserResponsesHTML;
};

fetchAndShowResponses();
