import firebase from 'firebase/app';
import 'firebase/database'; 
// import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChsgyPy-2OJdxw45_glq33bYQcP3x3JyI",
  authDomain: "-//Apple//DTD PLIST 1.0//EN",
  databaseURL: "http://www.apple.com/DTDs/PropertyList-1.0.dtd", // For Realtime Database
  projectId: "shindig-9fda2",
  storageBucket: "shindig-9fda2.appspot.com",
  messagingSenderId: "1032535321404",
  appId: "1:1032535321404:ios:6cca383ad0a6c77bbb8c39"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const myData = [
  { id: 1, name: "Amy's Ice Cream", description: "Amy's Ice Creams is a privately owned chain of ice cream shops in Texas with headquarters in Austin. The Austin Chronicle described Amy's as a \"quintessentially Austin institution\" which \"dominates the local ice cream scene.\" Amy's ice cream is owned by Amy Simmons.", image: require('./images/amyicecreamtinder.jpeg'), rating: 4, distance: '1.1 mi', compatability: 95},
  { id: 2, name: 'Blanton Art Museum', description: 'The Jack S. Blanton Museum of Art at the University of Texas at Austin is one of the largest university art museums in the U.S. with 189,340 square feet devoted to temporary exhibitions, permanent collection galleries, storage, administrative offices, classrooms, a print study room, an auditorium, shop, and cafe.', image: require('./images/blanton.jpeg'), rating: 3, distance: '0.4 mi', compatability: 75 },
  { id: 3, name: 'Franklin Barbecue', description: 'Long lines form early for brisket, pulled pork & other smoked meats at this bustling spot.', image: require('./images/franklin.jpg'), rating: 5, distance: '1.2 mi', compatability: 60},
  { id: 4, name: 'Lady Bird Lake', description: 'Lady Bird Lake is a river-like reservoir on the Colorado River in Austin, Texas, United States. The City of Austin created the reservoir in 1960 as a cooling pond for a new city power plant. The lake, which has a surface area of 416 acres, is now used primarily for recreation and flood control.', image: require('./images/lbl.jpeg'), rating: 4, distance: '2.9 mi', compatability: 95},
  { id: 5, name: 'Pizza Press', description: 'Nostalgic restaurant doling out pizza, beer & more in casual, 1920s-style surroundings.', image: require('./images/pizzapress.jpeg'), rating: 3, distance: '0.4 mi', compatability: 70},
  { id: 6, name: 'Texas Capitol', description: 'The Texas State Capitol is the capitol and seat of government of the American state of Texas. Located in downtown Austin, Texas, the structure houses the offices and chambers of the Texas Legislature and of the Governor of Texas.', image: require('./images/capitol.jpg'), rating: 2, distance : '0.8 mi', compatability: 40},
  { id: 7, name: 'UT Campus Walk', description: 'Want to explore the 40 acres? Go on this self-guided tour to learn the history behind some of UT Austin’s most iconic buildings and features', image: require('./images/2-3-vertical-turtle-pond-ut-tower.jpg'), rating: 5, distance: '0.2 mi', compatability: 99},
]

const myGroups = [
  {id: 1, name: 'My Family', members: 4, image: require('./images/family.jpeg')},
  {id: 2, name: 'My Friend Group', members: 1, image: require('./images/friends.jpeg')},
  {id: 3, name: 'Convergent Brown Bags', members: 6, image: require('./images/convergent.png')},
]

// Push myData to Firebase
const myDataRef = firebase.database().ref('myData');
myDataRef.set(myData);

// Push myGroups to Firebase
const myGroupsRef = firebase.database().ref('myGroups');
myGroupsRef.set(myGroups);
