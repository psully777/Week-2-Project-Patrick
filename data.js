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
  <img class = "hoverClass" src = "https://drive.google.com/thumbnail?id=${googlePhotoId}" alt = "Hobby picture"/>
  <h2 class = "nameClass">${personsName}</h2>
  <h3 class = "myHobby">My favorite hobby is ${hobbyName}, and I have been doing this for ${hobbyTime}<h3>

  <section class="listOfQuestions">

  <h3 class = "question">Why do you do this?<h3>
  <h4 class= "answer" >${whyDoYouDoThis}</h4>

  <h3 class = "question">How often are you able to do this?<h3>
  <h4>${cadence}</h4>

  <h3 class = "question">Is this typically done indoors or outdoors?<h3>
  <h4>${location}</h4>

  <h3 class = "question">Why do I enjoy this? <h3>
  <h4 class = "response">${description}<h4>

  </section>
  </div>
  `;
};

// const handleMouseMove = () => {
//   renderUserResponse.style.color = 'blue';
// };

// window.addEventListener('mousemove', handleMouseMove);

const fetchAndShowResponses = async () => {
  await fetchUserResponses();
  const eachUserResponseHTML = responses.map(renderUserResponse);
  const allUserResponsesHTML = eachUserResponseHTML.join('');
  userResponsesSection.innerHTML = allUserResponsesHTML;
};

const howLongData{
  "&lt 3 months": 0,
  "3 - 12 months": 0,
  "1 - 3 years": 0,
  "> 3 years": 0,
}

responses.forEach(response => {
  howLongData[response[question]] +=1
})

var Chart = ('pie-chart', {
  type: 'pie',
  data: {
    datasets[{
      data: Object.values(howLongData),
      backgroundColor:['blue', 'red', 'white']
      
    }]
  },
  
});

fetchAndShowResponses();
