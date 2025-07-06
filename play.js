// Initialize EmailJS
(function() {
    emailjs.init("ZKJrFdtrTk4pQYv1j"); // Replace with your EmailJS user ID
})();

// Global variables
let currentUser = null;
let visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
let currentSongIndex = 0;
let isPlaying = false;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let currentPlaylist = [];
let currentPlaylistName = '';
let isRepeat = false;
let currentVolume = 50;

// Enhanced music data with more songs
const musicData = {
    naat: [
        {
            title: "Ya Nabi Salam Alayka",
            artist: "Maher Zain",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Habibi Ya Rasool Allah",
            artist: "Sami Yusuf",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Mustafa Jaan-e-Rehmat",
            artist: "Nusrat Fateh Ali Khan",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Allah Hoo",
            artist: "Nusrat Fateh Ali Khan",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Hasbi Rabbi",
            artist: "Sami Yusuf",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Mera Dil Badal De",
            artist: "Junaid Jamshed",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ilahi Teri Chokhat Par",
            artist: "Junaid Jamshed",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Balaghal Ula",
            artist: "Maher Zain",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Asma ul Husna",
            artist: "Sami Yusuf",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Muhammad Nabina",
            artist: "Maher Zain",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Allahu Allah",
            artist: "Labbayk",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ya Adheeman",
            artist: "Mishary Rashid",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Tala'al Badru Alayna",
            artist: "Maher Zain",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Subhan Allah",
            artist: "Sami Yusuf",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Dua",
            artist: "Maher Zain",
            cover: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
    ],
    quran: [
        {
            title: "Surah Al-Fatiha",
            artist: "Sheikh Mishary Rashid",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Baqarah",
            artist: "Sheikh Abdul Rahman Al-Sudais",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Yasin",
            artist: "Sheikh Maher Al-Muaiqly",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Ar-Rahman",
            artist: "Sheikh Mishary Rashid",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Mulk",
            artist: "Sheikh Abdul Rahman Al-Sudais",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Kahf",
            artist: "Sheikh Saad Al-Ghamdi",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Maryam",
            artist: "Sheikh Mishary Rashid",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Waqiah",
            artist: "Sheikh Abdul Rahman Al-Sudais",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Hashr",
            artist: "Sheikh Maher Al-Muaiqly",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Jumu'ah",
            artist: "Sheikh Mishary Rashid",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Munafiqun",
            artist: "Sheikh Abdul Rahman Al-Sudais",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah At-Taghabun",
            artist: "Sheikh Saad Al-Ghamdi",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah At-Talaq",
            artist: "Sheikh Mishary Rashid",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah At-Tahrim",
            artist: "Sheikh Abdul Rahman Al-Sudais",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Qalam",
            artist: "Sheikh Maher Al-Muaiqly",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Haqqah",
            artist: "Sheikh Mishary Rashid",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Ma'arij",
            artist: "Sheikh Abdul Rahman Al-Sudais",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Nuh",
            artist: "Sheikh Saad Al-Ghamdi",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Jinn",
            artist: "Sheikh Mishary Rashid",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Surah Al-Muzzammil",
            artist: "Sheikh Abdul Rahman Al-Sudais",
            cover: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
    ],
    sidhu: [
        {
            title: "So High",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/siddu.jpg",
            src: "siddhu mosywlaa/So high.mp3"
        },
        {
            title: "Legend",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/16.jpeg",
            src: "siddhu mosywlaa/legend.mp3"
        },
        {
            title: "295",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/2.jpeg",
            src: "siddhu mosywlaa/295.mp3"
        },
        {
            title: "The Last Ride",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/3.jpeg",
            src: "siddhu mosywlaa/last ride.mp3"
        },
        {
            title: "Jatt Da Muqabala",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/4.jpeg",
            src: "siddhu mosywlaa/jutt da.mp3"
        },
        {
            title: "Bambiha Bole",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/5.jpeg",
            src: "siddhu mosywlaa/bambia .mp3"
        },
        {
            title: "Sohne Lagde",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/6.jpeg",
            src: "siddhu mosywlaa/shone .mp3"
        },
        {
            title: "Tochan",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/7.jpeg",
            src: "siddhu mosywlaa/tohan.mp3"
        },
        {
            title: "Poison",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/8.jpeg",
            src: "siddhu mosywlaa/posian.mp3"
        },
        {
            title: "Goat",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/9.jpeg",
            src: "siddhu mosywlaa/goat.mp3"
        },
        {
            title: "Levels",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/10.jpeg",
            src: "siddhu mosywlaa/level.mp3"
        },
        {
            title: "Dhakka",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/11.jpeg",
            src: "siddhu mosywlaa/dakka.mp3"
        },
        {
            title: "Moosetape",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/12.jpeg",
            src: "siddhu mosywlaa/mosa tape.mp3"
        },
        {
            title: "Same Beef",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/13.jpeg",
            src: "siddhu mosywlaa/same beef.mp3"
        },
        {
            title: "Tibeyan Da Putt",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/14.jpeg",
            src: "siddhu mosywlaa/tabiyat.mp3"
        },
        {
            title: "Dark Love",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/15.jpeg",
            src: "siddhu mosywlaa/dark love.mp3"
        },
        {
            title: "Issa Jatt",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/17.jpeg",
            src: "siddhu mosywlaa/isa jutt.mp3"
        },
        {
            title: "Calaboose",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/18.jpeg",
            src: "siddhu mosywlaa/calabose.mp3"
        },
        {
            title: "Selfmade",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/19.jpeg",
            src: "siddhu mosywlaa/selfmade.mp3"
        },
        {
            title: "Burberry",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/20.jpeg",
            src: "siddhu mosywlaa/-burbury.mp3"
        },
        {
            title: "Chosen",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/21.jpeg",
            src: "siddhu mosywlaa/chosen.mp3"
        },
        {
            title: "Signed To God",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/22.jpeg",
            src: "siddhu mosywlaa/sign to god.mp3"
        },
        {
            title: "Unfuckable",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/23.jpeg",
            src: "siddhu mosywlaa/unfi.mp3"
        },
        {
            title: "Outlaw",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/24.jpeg",
            src: "siddhu mosywlaa/outlaw.mp3"
        },
        {
            title: "SYL",
            artist: "Sidhu Moosewala",
            cover: "siddhu mosywlaa/siddhu photos/25.jpeg",
            src: "siddhu mosywlaa/self made.mp3"
        }
    ],
    arijit: [
        {
            title: "Tum Hi Ho",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Channa Mereya",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Raabta",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Tera Yaar Hoon Main",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ae Dil Hai Mushkil",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Gerua",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Hamari Adhuri Kahani",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Phir Bhi Tumko Chaahunga",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Shayad",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Kesariya",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Apna Bana Le",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Dil Diyan Gallan",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Hawayein",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Pal Pal Dil Ke Paas",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Bekhayali",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Tujhe Kitna Chahne Lage",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Pachtaoge",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Kalank",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ve Maahi",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Humsafar",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Muskurane",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Soch Na Sake",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Janam Janam",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Bolna",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Samjhawan",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Nashe Si Chadh Gayi",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Laal Ishq",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Khairiyat",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Enna Sona",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Sanam Re",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
    ],
    honey: [
        {
            title: "Blue Eyes",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Dope Shope",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Angreji Beat",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Lungi Dance",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Manali Trance",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Love Dose",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Chaar Botal Vodka",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Sunny Sunny",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Desi Kalakaar",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Makhna",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Gur Naal Ishq Mitha",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Loca",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Issey Kehte Hain Hip Hop",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Bring Me Back",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Gabru",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Party With The Bhoothnath",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Saat Samundar",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Yaar Na Miley",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Billo Tu Agg",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Moscow Suka",
            artist: "Yo Yo Honey Singh",
            cover: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
    ],
    bollywood: [
        {
            title: "Jai Ho",
            artist: "A.R. Rahman",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Nagada Sang Dhol",
            artist: "Shreya Ghoshal",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Malhari",
            artist: "Vishal Dadlani",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ghoomar",
            artist: "Shreya Ghoshal",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Despacito",
            artist: "Luis Fonsi",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Senorita",
            artist: "Shawn Mendes",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Dilbar",
            artist: "Neha Kakkar",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Kamariya",
            artist: "Darshan Raval",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Tera Ban Jaunga",
            artist: "Akhil Sachdeva",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Pehla Nasha",
            artist: "Udit Narayan",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Tujhe Dekha To",
            artist: "Kumar Sanu",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Kuch Kuch Hota Hai",
            artist: "Udit Narayan",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Suraj Hua Maddham",
            artist: "Sonu Nigam",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Bole Chudiyan",
            artist: "Udit Narayan",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ladki Badi Anjani Hai",
            artist: "Kumar Sanu",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Mere Khwabon Mein",
            artist: "Lata Mangeshkar",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Chaiyya Chaiyya",
            artist: "Sukhwinder Singh",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Kal Ho Naa Ho",
            artist: "Sonu Nigam",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Vande Mataram",
            artist: "A.R. Rahman",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Maa Tujhe Salaam",
            artist: "A.R. Rahman",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Rang Barse",
            artist: "Amitabh Bachchan",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Nagada Sang Dhol",
            artist: "Shreya Ghoshal",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Tumhi Dekho Na",
            artist: "Sonu Nigam",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ishq Wala Love",
            artist: "Shekhar Ravjiani",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Radha",
            artist: "Shreya Ghoshal",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Galliyan",
            artist: "Ankit Tiwari",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Banno",
            artist: "Brijesh Shandilya",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Nashe Si Chadh Gayi",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Badtameez Dil",
            artist: "Benny Dayal",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ilahi",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Matargashti",
            artist: "Mohit Chauhan",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Bezubaan Phir Se",
            artist: "Rehan Khan",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Sooraj Dooba Hain",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Jeene Laga Hoon",
            artist: "Atif Aslam",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Saware",
            artist: "Arijit Singh",
            cover: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
    ],
    punjabi: [
        {
            title: "Laembadgini",
            artist: "Diljit Dosanjh",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Proper Patola",
            artist: "Diljit Dosanjh",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "High Rated Gabru",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Lahore",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Suit Suit",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ban Ja Rani",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Ishare Tere",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Made In India",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Patola",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Raat Kamaal Hai",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Slowly Slowly",
            artist: "Guru Randhawa",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Naah",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Kya Baat Ay",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Backbone",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Soch",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Joker",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Bijlee Bijlee",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Titliaan",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Hornn Blow",
            artist: "Harrdy Sandhu",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Yaar Mod Do",
            artist: "Millind Gaba",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "She Don't Know",
            artist: "Millind Gaba",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Nazar Lag Jayegi",
            artist: "Millind Gaba",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Welcome Back",
            artist: "Millind Gaba",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Main Tera Boyfriend",
            artist: "Millind Gaba",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Nakhre",
            artist: "Millind Gaba",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Dilliwaliye",
            artist: "Millind Gaba",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Bom Diggy",
            artist: "Zack Knight",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        },
        {
            title: "Gallan Goodiyaan",
            artist: "Yash Narvekar",
            cover: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=300",
            src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        }
    ]
};

// Liked songs from localStorage
let likedSongs = JSON.parse(localStorage.getItem('likedSongs') || '[]');

// DOM elements
const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const visitorNameInput = document.getElementById('visitorName');
const visitorPhotoInput = document.getElementById('visitorPhoto');
const audioPlayer = document.getElementById('audioPlayer');
const musicPlayer = document.getElementById('musicPlayer');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupTheme();
    setupSlideshow();
    setupAnimation();
    updateVisitorCount();
    updateLikedCount();
});

function initializeApp() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainPage();
    } else {
        showLoginPage();
    }
}

function showLoginPage() {
    loginPage.classList.add('active');
    mainPage.classList.remove('active');
}

function showMainPage() {
    loginPage.classList.remove('active');
    mainPage.classList.add('active');
}

function setupEventListeners() {
    // Login steps
    document.getElementById('nextToPassword').addEventListener('click', validateUsername);
    document.getElementById('nextToVisitor').addEventListener('click', validatePassword);
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    
    // Back buttons
    document.getElementById('backToUsername').addEventListener('click', showUsernameStep);
    document.getElementById('backToPassword').addEventListener('click', showPasswordStep);
    
    // Toggle password visibility
    document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
    
    // Photo upload
    visitorPhotoInput.addEventListener('change', handlePhotoUpload);
    document.getElementById('uploadArea').addEventListener('click', () => visitorPhotoInput.click());
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('mobileThemeToggle').addEventListener('click', toggleTheme);
    
    // Mobile menu
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    document.getElementById('closeMobileNav').addEventListener('click', toggleMobileMenu);
    
    // Navigation
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // Playlist cards
    document.querySelectorAll('.playlist-card').forEach(card => {
        card.addEventListener('click', () => {
            const playlistType = card.dataset.playlist;
            loadPlaylist(playlistType);
            showSection('playlists');
        });
    });
    
    // Music player controls
    document.getElementById('playPauseBtn').addEventListener('click', togglePlayPause);
    document.getElementById('nextBtn').addEventListener('click', nextSong);
    document.getElementById('prevBtn').addEventListener('click', prevSong);
    document.getElementById('shuffleBtn').addEventListener('click', shufflePlaylist);
    document.getElementById('playAllBtn').addEventListener('click', playAllSongs);
    document.getElementById('likeBtn').addEventListener('click', toggleLike);
    document.getElementById('repeatBtn').addEventListener('click', toggleRepeat);
    
    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Volume control
    document.getElementById('volumeSlider').addEventListener('input', (e) => {
        currentVolume = e.target.value;
        audioPlayer.volume = currentVolume / 100;
    });
    
    // Progress bar
    document.querySelector('.progress-bar').addEventListener('click', handleProgressClick);
    
    // Audio events
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', handleSongEnd);
    
    // Set initial volume
    audioPlayer.volume = currentVolume / 100;
    document.getElementById('volumeSlider').value = currentVolume;
}

function validateUsername() {
    const username = usernameInput.value.trim();
    if (username === '') {
        showMessage('Please enter username', 'error');
        return;
    }
    showPasswordStep();
}

function validatePassword() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username !== 'drpro22' || password !== 'song@123') {
        showMessage('Invalid username or password', 'error');
        return;
    }
    showVisitorStep();
}

function showUsernameStep() {
    document.getElementById('usernameStep').classList.add('active');
    document.getElementById('passwordStep').classList.remove('active');
    document.getElementById('visitorStep').classList.remove('active');
}

function showPasswordStep() {
    document.getElementById('usernameStep').classList.remove('active');
    document.getElementById('passwordStep').classList.add('active');
    document.getElementById('visitorStep').classList.remove('active');
}

function showVisitorStep() {
    document.getElementById('usernameStep').classList.remove('active');
    document.getElementById('passwordStep').classList.remove('active');
    document.getElementById('visitorStep').classList.add('active');
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoPreview = document.getElementById('photoPreview');
            photoPreview.innerHTML = `<img src="${e.target.result}" alt="Visitor Photo">`;
        };
        reader.readAsDataURL(file);
    }
}

function sendVisitorDataToEmail(visitorName, photoDataUrl) {
    const templateParams = {
        to_email: 'muhammad.ali.020457@gmail.com', // Replace with your email
        visitor_name: visitorName,
        visitor_photo: photoDataUrl,
        login_time: new Date().toLocaleString(),
        visitor_count: visitorCount + 1,
        username: usernameInput.value.trim()
    };
    
    emailjs.send('service_3t4t63f', 'template_y345958', templateParams)
        .then(function(response) {
            console.log('Visitor data sent successfully!', response);
        })
        .catch(function(error) {
            console.log('Failed to send visitor data:', error);
        });
}

function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const visitorName = visitorNameInput.value.trim();
    const photo = visitorPhotoInput.files[0];
    
    if (!visitorName) {
        showMessage('Please enter your name', 'error');
        return;
    }
    
    if (!photo) {
        showMessage('Please upload your photo', 'error');
        return;
    }
    
    if (username === 'drpro22' && password === 'song@123') {
        // Send visitor data to email
        const reader = new FileReader();
        reader.onload = function(e) {
            sendVisitorDataToEmail(visitorName, e.target.result);
        };
        reader.readAsDataURL(photo);
        
        currentUser = { 
            username, 
            visitorName,
            loginTime: new Date() 
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        incrementVisitorCount();
        showMainPage();
        showMessage(`Welcome ${visitorName}! Login successful!`, 'success');
    } else {
        showMessage('Invalid credentials', 'error');
    }
}

function incrementVisitorCount() {
    visitorCount++;
    localStorage.setItem('visitorCount', visitorCount.toString());
    updateVisitorCount();
}

function updateVisitorCount() {
    document.getElementById('visitorCount').textContent = visitorCount;
    document.getElementById('visitorCountDisplay').textContent = visitorCount;
}

function updateLikedCount() {
    document.getElementById('likedCount').textContent = `${likedSongs.length} Songs`;
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode.toString());
    setupTheme();
}

function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    
    if (isDarkMode) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>Light Mode';
        }
    } else {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        if (mobileThemeToggle) {
            mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i>Dark Mode';
        }
    }
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName + 'Section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function loadPlaylist(playlistType) {
    if (playlistType === 'liked') {
        currentPlaylist = likedSongs;
        currentPlaylistName = 'Liked Songs';
    } else {
        currentPlaylist = musicData[playlistType] || [];
        currentPlaylistName = getPlaylistName(playlistType);
    }
    
    displayPlaylist();
}

function getPlaylistName(type) {
    const names = {
        naat: 'Naat Sharif',
        quran: 'Quran Recitation',
        sidhu: 'Sidhu Moosewala',
        arijit: 'Arijit Singh',
        honey: 'Yo Yo Honey Singh',
        bollywood: 'Bollywood Hits',
        punjabi: 'Punjabi Mix'
    };
    return names[type] || 'Unknown Playlist';
}

function displayPlaylist() {
    const playlistTitle = document.getElementById('playlistTitle');
    const songsList = document.getElementById('songsList');
    
    playlistTitle.textContent = currentPlaylistName;
    songsList.innerHTML = '';
    
    if (currentPlaylist.length === 0) {
        songsList.innerHTML = '<div class="no-songs">No songs in this playlist</div>';
        return;
    }
    
    currentPlaylist.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = 'song-item';
        songItem.innerHTML = `
            <div class="song-cover">
                <img src="${song.cover}" alt="${song.title}">
            </div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-actions">
                <button class="action-btn like-btn ${isLiked(song) ? 'liked' : ''}" onclick="toggleSongLike(${index})">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn" onclick="playSong(${index})">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        `;
        songsList.appendChild(songItem);
    });
}

function playSong(index) {
    if (currentPlaylist.length === 0) return;
    
    currentSongIndex = index;
    const song = currentPlaylist[index];
    
    // Update UI
    document.getElementById('currentSongTitle').textContent = song.title;
    document.getElementById('currentSongArtist').textContent = song.artist;
    document.getElementById('currentSongCover').src = song.cover;
    
    // Update audio
    audioPlayer.src = song.src;
    audioPlayer.play();
    isPlaying = true;
    
    // Show player
    musicPlayer.classList.add('active');
    
    // Update play button
    document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
    
    // Update active song in list
    document.querySelectorAll('.song-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update like button
    updateLikeButton();
    
    // Start 3D animation
    startMusicAnimation();
}

function playAllSongs() {
    if (currentPlaylist.length === 0) {
        showMessage('No songs to play', 'info');
        return;
    }
    playSong(0);
    showMessage('Playing all songs', 'success');
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-play"></i>';
        stopMusicAnimation();
    } else {
        audioPlayer.play();
        document.getElementById('playPauseBtn').innerHTML = '<i class="fas fa-pause"></i>';
        startMusicAnimation();
    }
    isPlaying = !isPlaying;
}

function nextSong() {
    if (currentPlaylist.length === 0) return;
    currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
    playSong(currentSongIndex);
}

function prevSong() {
    if (currentPlaylist.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playSong(currentSongIndex);
}

function handleSongEnd() {
    if (isRepeat) {
        playSong(currentSongIndex);
    } else {
        nextSong();
    }
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    const repeatBtn = document.getElementById('repeatBtn');
    if (isRepeat) {
        repeatBtn.style.color = 'var(--primary-color)';
        showMessage('Repeat enabled', 'info');
    } else {
        repeatBtn.style.color = 'var(--text-color)';
        showMessage('Repeat disabled', 'info');
    }
}

function shufflePlaylist() {
    if (currentPlaylist.length === 0) return;
    
    const shuffled = [...currentPlaylist];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    currentPlaylist = shuffled;
    currentSongIndex = 0;
    displayPlaylist();
    showMessage('Playlist shuffled!', 'success');
}

function toggleLike() {
    if (currentPlaylist.length === 0) return;
    
    const currentSong = currentPlaylist[currentSongIndex];
    const likeBtn = document.getElementById('likeBtn');
    
    if (isLiked(currentSong)) {
        // Remove from liked songs
        likedSongs = likedSongs.filter(song => song.title !== currentSong.title);
        likeBtn.classList.remove('liked');
        showMessage('Removed from liked songs', 'info');
    } else {
        // Add to liked songs
        likedSongs.push(currentSong);
        likeBtn.classList.add('liked');
        showMessage('Added to liked songs', 'success');
    }
    
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    updateLikeButton();
    updateLikedCount();
}

function toggleSongLike(index) {
    const song = currentPlaylist[index];
    const likeBtn = document.querySelector(`.song-item:nth-child(${index + 1}) .like-btn`);
    
    if (isLiked(song)) {
        likedSongs = likedSongs.filter(s => s.title !== song.title);
        likeBtn.classList.remove('liked');
        showMessage('Removed from liked songs', 'info');
    } else {
        likedSongs.push(song);
        likeBtn.classList.add('liked');
        showMessage('Added to liked songs', 'success');
    }
    
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
    updateLikeButton();
    updateLikedCount();
}

function isLiked(song) {
    return likedSongs.some(s => s.title === song.title);
}

function updateLikeButton() {
    if (currentPlaylist.length === 0) return;
    
    const currentSong = currentPlaylist[currentSongIndex];
    const likeBtn = document.getElementById('likeBtn');
    
    if (isLiked(currentSong)) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!searchTerm) return;
    
    const allSongs = [];
    Object.values(musicData).forEach(playlist => {
        allSongs.push(...playlist);
    });
    
    const searchResults = allSongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) || 
        song.artist.toLowerCase().includes(searchTerm)
    );
    
    if (searchResults.length > 0) {
        currentPlaylist = searchResults;
        currentPlaylistName = `Search results for "${searchTerm}"`;
        displayPlaylist();
        showSection('playlists');
        showMessage(`Found ${searchResults.length} songs`, 'success');
    } else {
        showMessage('No songs found', 'info');
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };
    
    const templateParams = {
        to_email: 'your-email@gmail.com', // Replace with your email
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        sent_time: new Date().toLocaleString()
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', templateParams)
        .then(function(response) {
            showMessage('Message sent successfully!', 'success');
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            showMessage('Failed to send message. Please try again.', 'error');
        });
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    
    // Stop music if playing
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
        musicPlayer.classList.remove('active');
        stopMusicAnimation();
    }
    
    showLoginPage();
    showMessage('Logged out successfully', 'info');
}

function updateDuration() {
    const duration = audioPlayer.duration;
    document.getElementById('duration').textContent = formatTime(duration);
}

function updateProgress() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progress = (currentTime / duration) * 100;
    
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('currentTime').textContent = formatTime(currentTime);
}

function handleProgressClick(e) {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const duration = audioPlayer.duration;
    
    audioPlayer.currentTime = percent * duration;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function setupSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 4 seconds
    setInterval(nextSlide, 4000);
}

function setupAnimation() {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            dx: (Math.random() - 0.5) * 0.8,
            dy: (Math.random() - 0.5) * 0.8,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.dx = -particle.dx;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy = -particle.dy;
            
            ctx.globalAlpha = particle.opacity;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

let animationId;

function startMusicAnimation() {
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    
    function musicVisualize() {
        if (!isPlaying) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create dynamic visual effects
        const time = Date.now() * 0.001;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw pulsing circles
        for (let i = 0; i < 5; i++) {
            const radius = 50 + i * 30 + Math.sin(time + i) * 20;
            const opacity = 0.1 - i * 0.02;
            
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `hsl(${(time * 50 + i * 60) % 360}, 70%, 60%)`;
            ctx.lineWidth = 3;
            ctx.stroke();
        }
        
        // Draw rotating bars
        const barCount = 32;
        for (let i = 0; i < barCount; i++) {
            const angle = (i / barCount) * Math.PI * 2 + time;
            const barHeight = 30 + Math.sin(time * 2 + i * 0.5) * 20;
            const x1 = centerX + Math.cos(angle) * 100;
            const y1 = centerY + Math.sin(angle) * 100;
            const x2 = centerX + Math.cos(angle) * (100 + barHeight);
            const y2 = centerY + Math.sin(angle) * (100 + barHeight);
            
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `hsl(${(i * 10 + time * 100) % 360}, 70%, 60%)`;
            ctx.lineWidth = 4;
            ctx.stroke();
        }
        
        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(musicVisualize);
    }
    
    musicVisualize();
}

function stopMusicAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 18px 25px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
        max-width: 350px;
    `;
    
    switch (type) {
        case 'success':
            messageDiv.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'error':
            messageDiv.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        case 'info':
            messageDiv.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
            break;
        default:
            messageDiv.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
    }
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 400);
    }, 4000);
}