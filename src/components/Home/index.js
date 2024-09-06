import { useState , useEffect } from "react"
import "./index.css"

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE"
}

const indianCities = [
  { id: 1, value: 'delhi', label: 'Delhi' },
  { id: 2, value: 'mumbai', label: 'Mumbai' },
  { id: 3, value: 'bangalore', label: 'Bangalore' },
  { id: 4, value: 'hyderabad', label: 'Hyderabad' },
  { id: 5, value: 'chennai', label: 'Chennai' },
  { id: 6, value: 'kolkata', label: 'Kolkata' },
  { id: 7, value: 'pune', label: 'Pune' },
  { id: 8, value: 'ahmedabad', label: 'Ahmedabad' },
  { id: 9, value: 'jaipur', label: 'Jaipur' },
  { id: 10, value: 'surat', label: 'Surat' },
  { id: 11, value: 'lucknow', label: 'Lucknow' },
  { id: 12, value: 'nagpur', label: 'Nagpur' },
  { id: 13, value: 'kanpur', label: 'Kanpur' },
  { id: 14, value: 'indore', label: 'Indore' },
  { id: 15, value: 'bhopal', label: 'Bhopal' },
  { id: 16, value: 'chandigarh', label: 'Chandigarh' },
  { id: 17, value: 'coimbatore', label: 'Coimbatore' },
  { id: 18, value: 'visakhapatnam', label: 'Visakhapatnam' },
  { id: 19, value: 'vadodara', label: 'Vadodara' },
  { id: 20, value: 'madurai', label: 'Madurai' },
  { id: 21, value: 'rajkot', label: 'Rajkot' },
  { id: 22, value: 'nashik', label: 'Nashik' },
  { id: 23, value: 'pimpri-chinchwad', label: 'Pimpri-Chinchwad' },
  { id: 24, value: 'meerut', label: 'Meerut' },
  { id: 25, value: 'bhubaneswar', label: 'Bhubaneswar' },
  { id: 26, value: 'kanchipuram', label: 'Kanchipuram' },
  { id: 27, value: 'tiruchirappalli', label: 'Tiruchirappalli' },
  { id: 28, value: 'jabalpur', label: 'Jabalpur' },
  { id: 29, value: 'vijayawada', label: 'Vijayawada' },
  { id: 30, value: 'thrissur', label: 'Thrissur' },
  { id: 31, value: 'hubli-dharwad', label: 'Hubli-Dharwad' },
  { id: 32, value: 'dehradun', label: 'Dehradun' },
  { id: 33, value: 'shimla', label: 'Shimla' },
  { id: 34, value: 'raipur', label: 'Raipur' },
  { id: 35, value: 'ranchi', label: 'Ranchi' },
  { id: 36, value: 'agartala', label: 'Agartala' },
  { id: 37, value: 'imphal', label: 'Imphal' },
  { id: 38, value: 'aizawl', label: 'Aizawl' },
  { id: 39, value: 'gangtok', label: 'Gangtok' },
  { id: 40, value: 'dispur', label: 'Dispur' },
  { id: 41, value: 'kottayam', label: 'Kottayam' },
  { id: 42, value: 'kakinada', label: 'Kakinada' },
  { id: 43, value: 'nanded', label: 'Nanded' },
  { id: 44, value: 'silchar', label: 'Silchar' },
  { id: 45, value: 'jodhpur', label: 'Jodhpur' },
  { id: 46, value: 'udaipur', label: 'Udaipur' },
  { id: 47, value: 'surendranagar', label: 'Surendranagar' },
  { id: 48, value: 'bikaner', label: 'Bikaner' },
  { id: 49, value: 'bhagalpur', label: 'Bhagalpur' },
  { id: 50, value: 'gorakhpur', label: 'Gorakhpur' },
  { id: 51, value: 'siliguri', label: 'Siliguri' },
  { id: 52, value: 'kolar', label: 'Kolar' },
  { id: 53, value: 'navi-mumbai', label: 'Navi Mumbai' },
  { id: 54, value: 'jamshedpur', label: 'Jamshedpur' },
  { id: 55, value: 'warangal', label: 'Warangal' },
  { id: 56, value: 'nelore', label: 'Nellore' },
  { id: 57, value: 'kakinada', label: 'Kakinada' },
  { id: 58, value: 'mangalore', label: 'Mangalore' },
  { id: 59, value: 'aligarh', label: 'Aligarh' },
  { id: 60, value: 'bhatinda', label: 'Bathinda' },
  { id: 61, value: 'firozabad', label: 'Firozabad' },
  { id: 62, value: 'kannur', label: 'Kannur' },
  { id: 63, value: 'puducherry', label: 'Puducherry' },
  { id: 64, value: 'amritsar', label: 'Amritsar' },
  { id: 65, value: 'sangli', label: 'Sangli' },
  { id: 66, value: 'nagapattinam', label: 'Nagapattinam' },
  { id: 67, value: 'ambala', label: 'Ambala' },
  { id: 68, value: 'dhanbad', label: 'Dhanbad' },
  { id: 69, value: 'rajamahendravaram', label: 'Rajamahendravaram' },
  { id: 70, value: 'gaya', label: 'Gaya' },
  { id: 71, value: 'kolhapur', label: 'Kolhapur' },
  { id: 72, value: 'rourkela', label: 'Rourkela' },
  { id: 73, value: 'bhilai', label: 'Bhilai' },
  { id: 74, value: 'guntur', label: 'Guntur' },
  { id: 75, value: 'kurnool', label: 'Kurnool' },
  { id: 76, value: 'bhiwandi', label: 'Bhiwandi' },
  { id: 77, value: 'bilaspur', label: 'Bilaspur' },
  { id: 78, value: 'jalandhar', label: 'Jalandhar' },
  { id: 79, value: 'bijapur', label: 'Bijapur' },
  { id: 80, value: 'hubli', label: 'Hubli' },
  { id: 81, value: 'muzzafarpur', label: 'Muzaffarpur' },
  { id: 82, value: 'agra', label: 'Agra' },
  { id: 83, value: 'saharanpur', label: 'Saharanpur' },
  { id: 84, value: 'uttarakashi', label: 'Uttarkashi' },
  { id: 85, value: 'pali', label: 'Pali' },
  { id: 86, value: 'nagaur', label: 'Nagaur' },
  { id: 87, value: 'fatehpur', label: 'Fatehpur' },
  { id: 88, value: 'auraia', label: 'Auraiya' },
  { id: 89, value: 'pilani', label: 'Pilani' },
  { id: 90, value: 'kushinagar', label: 'Kushinagar' },
  { id: 91, value: 'unnao', label: 'Unnao' },
  { id: 92, value: 'hardoi', label: 'Hardoi' },
  { id: 93, value: 'ballia', label: 'Ballia' },
  { id: 94, value: 'varanasi', label: 'Varanasi' },
  { id: 95, value: 'basti', label: 'Basti' },
  { id: 96, value: 'gondia', label: 'Gondia' },
  { id: 97, value: 'shahjahanpur', label: 'Shahjahanpur' },
  { id: 98, value: 'pilibhit', label: 'Pilibhit' },
  { id: 99, value: 'deoria', label: 'Deoria' },
  { id: 100, value: 'chandrapur', label: 'Chandrapur' },
  { id: 101, value: 'sambhal', label: 'Sambhal' },
  { id: 102, value: 'mathura', label: 'Mathura' },
  { id: 103, value: 'saharanpur', label: 'Saharanpur' },
  { id: 104, value: 'etawah', label: 'Etawah' },
  { id: 105, value: 'cuttack', label: 'Cuttack' },
  { id: 106, value: 'ratlam', label: 'Ratlam' },
  { id: 107, value: 'kota', label: 'Kota' },
  { id: 108, value: 'bilaspur', label: 'Bilaspur' },
  { id: 109, value: 'sonipat', label: 'Sonipat' },
  { id: 110, value: 'raebareli', label: 'Raebareli' },
  { id: 111, value: 'sitapur', label: 'Sitapur' },
  { id: 112, value: 'buxar', label: 'Buxar' },
  { id: 113, value: 'madhubani', label: 'Madhubani' },
  { id: 114, value: 'shivpuri', label: 'Shivpuri' },
  { id: 115, value: 'guwahati', label: 'Guwahati' },
  { id: 116, value: 'nagaon', label: 'Nagaon' },
  { id: 117, value: 'bongaigaon', label: 'Bongaigaon' },
  { id: 118, value: 'jorhat', label: 'Jorhat' },
  { id: 119, value: 'karimganj', label: 'Karimganj' },
  { id: 120, value: 'goalpara', label: 'Goalpara' },
  { id: 121, value: 'dibrugarh', label: 'Dibrugarh' },
  { id: 122, value: 'itanagar', label: 'Itanagar' },
  { id: 123, value: 'agartala', label: 'Agartala' },
  { id: 124, value: 'jowai', label: 'Jowai' },
  { id: 125, value: 'shillong', label: 'Shillong' },
  { id: 126, value: 'mizoram', label: 'Mizoram' },
  { id: 127, value: 'kohima', label: 'Kohima' },
  { id: 128, value: 'dimapur', label: 'Dimapur' },
  { id: 129, value: 'ludhiana', label: 'Ludhiana' },
  { id: 130, value: 'jammu', label: 'Jammu' },
  { id: 131, value: 'srinagar', label: 'Srinagar' },
  { id: 132, value: 'pahalgam', label: 'Pahalgam' },
  { id: 133, value: 'anantnag', label: 'Anantnag' },
  { id: 134, value: 'pulwama', label: 'Pulwama' },
  { id: 135, value: 'udhampur', label: 'Udhampur' },
  { id: 136, value: 'kargil', label: 'Kargil' },
  { id: 137, value: 'leh', label: 'Leh' },
  { id: 138, value: 'doda', label: 'Doda' },
  { id: 139, value: 'kathua', label: 'Kathua' },
  { id: 140, value: 'rajouri', label: 'Rajouri' },
  { id: 141, value: 'poonch', label: 'Poonch' },
  { id: 142, value: 'reasi', label: 'Reasi' },
  { id: 143, value: 'samba', label: 'Samba' },
  { id: 144, value: 'kathua', label: 'Kathua' },
  { id: 145, value: 'palwal', label: 'Palwal' },
  { id: 146, value: 'faridabad', label: 'Faridabad' },
  { id: 147, value: 'panipat', label: 'Panipat' },
  { id: 148, value: 'sonipat', label: 'Sonipat' },
  { id: 149, value: 'kurukshetra', label: 'Kurukshetra' },
  { id: 150, value: 'kaithal', label: 'Kaithal' },
  { id: 151, value: 'jind', label: 'Jind' },
  { id: 152, value: 'hissar', label: 'Hisar' },
  { id: 153, value: 'sirsa', label: 'Sirsa' },
  { id: 154, value: 'bhiwani', label: 'Bhiwani' },
  { id: 155, value: 'jind', label: 'Jind' },
  { id: 156, value: 'kaithal', label: 'Kaithal' },
  { id: 157, value: 'charkhi-dadri', label: 'Charkhi Dadri' },
  { id: 158, value: 'rewari', label: 'Rewari' },
  { id: 159, value: 'palwal', label: 'Palwal' },
  { id: 160, value: 'ambala', label: 'Ambala' },
  { id: 161, value: 'yamunanagar', label: 'Yamunanagar' },
  { id: 162, value: 'kurukshetra', label: 'Kurukshetra' },
  { id: 163, value: 'chandigarh', label: 'Chandigarh' },
  { id: 164, value: 'baddi', label: 'Baddi' },
  { id: 165, value: 'solan', label: 'Solan' },
  { id: 166, value: 'shimla', label: 'Shimla' },
  { id: 167, value: 'bilaspur', label: 'Bilaspur' },
  { id: 168, value: 'mandi', label: 'Mandi' },
  { id: 169, value: 'kullu', label: 'Kullu' },
  { id: 170, value: 'hamirpur', label: 'Hamirpur' },
  { id: 171, value: 'una', label: 'Una' },
  { id: 172, value: 'sirmaur', label: 'Sirmaur' },
  { id: 173, value: 'kangra', label: 'Kangra' },
  { id: 174, value: 'chamba', label: 'Chamba' },
  { id: 175, value: 'ludhiana', label: 'Ludhiana' },
  { id: 176, value: 'patiala', label: 'Patiala' },
  { id: 177, value: 'amritsar', label: 'Amritsar' },
  { id: 178, value: 'jalandhar', label: 'Jalandhar' },
  { id: 179, value: 'bathinda', label: 'Bathinda' },
  { id: 180, value: 'moga', label: 'Moga' },
  { id: 181, value: 'ferozepur', label: 'Ferozepur' },
  { id: 182, value: 'faridkot', label: 'Faridkot' },
  { id: 183, value: 'muktsar', label: 'Muktsar' },
  { id: 184, value: 'hoshiarpur', label: 'Hoshiarpur' },
  { id: 185, value: 'kapurthala', label: 'Kapurthala' },
  { id: 186, value: 'jammu', label: 'Jammu' },
  { id: 187, value: 'srinagar', label: 'Srinagar' },
  { id: 188, value: 'anantnag', label: 'Anantnag' },
  { id: 189, value: 'shopian', label: 'Shopian' },
  { id: 190, value: 'kulgam', label: 'Kulgam' },
  { id: 191, value: 'kathua', label: 'Kathua' },
  { id: 192, value: 'udhampur', label: 'Udhampur' },
  { id: 193, value: 'rajouri', label: 'Rajouri' },
  { id: 194, value: 'poonch', label: 'Poonch' },
  { id: 195, value: 'reasi', label: 'Reasi' },
  { id: 196, value: 'samba', label: 'Samba' },
  { id: 197, value: 'bandipora', label: 'Bandipora' },
  { id: 198, value: 'baramulla', label: 'Baramulla' },
  { id: 199, value: 'kupwara', label: 'Kupwara' },
  { id: 200, value: 'srinagar', label: 'Srinagar' },
  { id: 201, value: 'katra', label: 'Katra' },
  { id: 202, value: 'jammu', label: 'Jammu' },
  { id: 203, value: 'pahalgam', label: 'Pahalgam' },
  { id: 204, value: 'srinagar', label: 'Srinagar' },
  { id: 205, value: 'anantnag', label: 'Anantnag' },
  { id: 206, value: 'udhampur', label: 'Udhampur' },
  { id: 207, value: 'kathua', label: 'Kathua' },
  { id: 208, value: 'bandipora', label: 'Bandipora' },
  { id: 209, value: 'baramulla', label: 'Baramulla' },
  { id: 210, value: 'shopian', label: 'Shopian' },
  { id: 211, value: 'kulgam', label: 'Kulgam' },
  { id: 212, value: 'samba', label: 'Samba' },
  { id: 213, value: 'reasi', label: 'Reasi' },
  { id: 214, value: 'poonch', label: 'Poonch' },
  { id: 215, value: 'rajouri', label: 'Rajouri' },
  { id: 216, value: 'jammu', label: 'Jammu' },
  { id: 217, value: 'srinagar', label: 'Srinagar' },
  { id: 218, value: 'anantnag', label: 'Anantnag' },
  { id: 219, value: 'udhampur', label: 'Udhampur' },
  { id: 220, value: 'kathua', label: 'Kathua' },
  { id: 221, value: 'bandipora', label: 'Bandipora' },
  { id: 222, value: 'baramulla', label: 'Baramulla' },
  { id: 223, value: 'shopian', label: 'Shopian' },
  { id: 224, value: 'kulgam', label: 'Kulgam' },
  { id: 225, value: 'samba', label: 'Samba' },
  { id: 226, value: 'reasi', label: 'Reasi' },
  { id: 227, value: 'poonch', label: 'Poonch' },
  { id: 228, value: 'rajouri', label: 'Rajouri' },
  { id: 229, value: 'kargil', label: 'Kargil' },
  { id: 230, value: 'leh', label: 'Leh' },
  { id: 231, value: 'srinagar', label: 'Srinagar' },
  { id: 232, value: 'jammu', label: 'Jammu' },
  { id: 233, value: 'anantnag', label: 'Anantnag' },
  { id: 234, value: 'pahalgam', label: 'Pahalgam' },
  { id: 235, value: 'udhampur', label: 'Udhampur' },
  { id: 236, value: 'kathua', label: 'Kathua' },
  { id: 237, value: 'bandipora', label: 'Bandipora' },
  { id: 238, value: 'baramulla', label: 'Baramulla' },
  { id: 239, value: 'shopian', label: 'Shopian' },
  { id: 240, value: 'kulgam', label: 'Kulgam' },
  { id: 241, value: 'samba', label: 'Samba' },
  { id: 242, value: 'reasi', label: 'Reasi' },
  { id: 243, value: 'poonch', label: 'Poonch' },
  { id: 244, value: 'rajouri', label: 'Rajouri' },
  { id: 245, value: 'jammu', label: 'Jammu' },
  { id: 246, value: 'srinagar', label: 'Srinagar' },
  { id: 247, value: 'anantnag', label: 'Anantnag' },
  { id: 248, value: 'pahalgam', label: 'Pahalgam' },
  { id: 249, value: 'udhampur', label: 'Udhampur' },
  { id: 250, value: 'kathua', label: 'Kathua' },
  { id: 251, value: 'bandipora', label: 'Bandipora' },
  { id: 252, value: 'baramulla', label: 'Baramulla' },
  { id: 253, value: 'shopian', label: 'Shopian' },
  { id: 254, value: 'kulgam', label: 'Kulgam' },
  { id: 255, value: 'samba', label: 'Samba' },
  { id: 256, value: 'reasi', label: 'Reasi' },
  { id: 257, value: 'poonch', label: 'Poonch' },
  { id: 258, value: 'rajouri', label: 'Rajouri' },
  { id: 259, value: 'jammu', label: 'Jammu' },
  { id: 260, value: 'srinagar', label: 'Srinagar' },
  { id: 261, value: 'anantnag', label: 'Anantnag' },
  { id: 262, value: 'pahalgam', label: 'Pahalgam' },
  { id: 263, value: 'udhampur', label: 'Udhampur' },
  { id: 264, value: 'kathua', label: 'Kathua' },
  { id: 265, value: 'bandipora', label: 'Bandipora' },
  { id: 266, value: 'baramulla', label: 'Baramulla' },
  { id: 267, value: 'shopian', label: 'Shopian' },
  { id: 268, value: 'kulgam', label: 'Kulgam' },
  { id: 269, value: 'samba', label: 'Samba' },
  { id: 270, value: 'reasi', label: 'Reasi' },
  { id: 271, value: 'poonch', label: 'Poonch' },
  { id: 272, value: 'rajouri', label: 'Rajouri' },
  { id: 273, value: 'jammu', label: 'Jammu' },
  { id: 274, value: 'srinagar', label: 'Srinagar' },
  { id: 275, value: 'anantnag', label: 'Anantnag' },
  { id: 276, value: 'pahalgam', label: 'Pahalgam' },
  { id: 277, value: 'udhampur', label: 'Udhampur' },
  { id: 278, value: 'kathua', label: 'Kathua' },
  { id: 279, value: 'bandipora', label: 'Bandipora' },
  { id: 280, value: 'baramulla', label: 'Baramulla' },
  { id: 281, value: 'shopian', label: 'Shopian' },
  { id: 282, value: 'kulgam', label: 'Kulgam' },
  { id: 283, value: 'samba', label: 'Samba' },
  { id: 284, value: 'reasi', label: 'Reasi' },
  { id: 285, value: 'poonch', label: 'Poonch' },
  { id: 286, value: 'rajouri', label: 'Rajouri' },
  { id: 287, value: 'jammu', label: 'Jammu' },
  { id: 288, value: 'srinagar', label: 'Srinagar' },
  { id: 289, value: 'anantnag', label: 'Anantnag' },
  { id: 290, value: 'pahalgam', label: 'Pahalgam' },
  { id: 291, value: 'udhampur', label: 'Udhampur' },
  { id: 292, value: 'kathua', label: 'Kathua' },
  { id: 293, value: 'bandipora', label: 'Bandipora' },
  { id: 294, value: 'baramulla', label: 'Baramulla' },
  { id: 295, value: 'shopian', label: 'Shopian' },
  { id: 296, value: 'kulgam', label: 'Kulgam' },
  { id: 297, value: 'samba', label: 'Samba' },
  { id: 298, value: 'reasi', label: 'Reasi' },
  { id: 299, value: 'poonch', label: 'Poonch' },
  { id: 300, value: 'rajouri', label: 'Rajouri' },
  { id: 301, value: 'jammu', label: 'Jammu' },
  { id: 302, value: 'srinagar', label: 'Srinagar' },
  { id: 303, value: 'anantnag', label: 'Anantnag' },
  { id: 304, value: 'pahalgam', label: 'Pahalgam' },
  { id: 305, value: 'udhampur', label: 'Udhampur' },
  { id: 306, value: 'kathua', label: 'Kathua' },
  { id: 307, value: 'bandipora', label: 'Bandipora' },
  { id: 308, value: 'baramulla', label: 'Baramulla' },
  { id: 309, value: 'shopian', label: 'Shopian' },
  { id: 310, value: 'kulgam', label: 'Kulgam' },
  { id: 311, value: 'samba', label: 'Samba' },
  { id: 312, value: 'reasi', label: 'Reasi' },
  { id: 313, value: 'poonch', label: 'Poonch' },
  { id: 314, value: 'rajouri', label: 'Rajouri' },
  { id: 315, value: 'jammu', label: 'Jammu' },
  { id: 316, value: 'srinagar', label: 'Srinagar' },
  { id: 317, value: 'anantnag', label: 'Anantnag' },
  { id: 318, value: 'pahalgam', label: 'Pahalgam' },
  { id: 319, value: 'udhampur', label: 'Udhampur' },
  { id: 320, value: 'kathua', label: 'Kathua' },
  { id: 321, value: 'bandipora', label: 'Bandipora' },
  { id: 322, value: 'baramulla', label: 'Baramulla' },
  { id: 323, value: 'shopian', label: 'Shopian' },
  { id: 324, value: 'kulgam', label: 'Kulgam' },
  { id: 325, value: 'samba', label: 'Samba' },
  { id: 326, value: 'reasi', label: 'Reasi' },
  { id: 327, value: 'poonch', label: 'Poonch' },
  { id: 328, value: 'rajouri', label: 'Rajouri' },
  { id: 329, value: 'jammu', label: 'Jammu' },
  { id: 330, value: 'srinagar', label: 'Srinagar' },
  { id: 331, value: 'anantnag', label: 'Anantnag' },
  { id: 332, value: 'pahalgam', label: 'Pahalgam' },
  { id: 333, value: 'udhampur', label: 'Udhampur' },
  { id: 334, value: 'kathua', label: 'Kathua' },
  { id: 335, value: 'bandipora', label: 'Bandipora' },
  { id: 336, value: 'baramulla', label: 'Baramulla' },
  { id: 337, value: 'shopian', label: 'Shopian' },
  { id: 338, value: 'kulgam', label: 'Kulgam' },
  { id: 339, value: 'samba', label: 'Samba' },
  { id: 340, value: 'reasi', label: 'Reasi' },
  { id: 341, value: 'poonch', label: 'Poonch' },
  { id: 342, value: 'rajouri', label: 'Rajouri' },
  { id: 343, value: 'jammu', label: 'Jammu' },
  { id: 344, value: 'srinagar', label: 'Srinagar' },
  { id: 345, value: 'anantnag', label: 'Anantnag' },
  { id: 346, value: 'pahalgam', label: 'Pahalgam' },
  { id: 347, value: 'udhampur', label: 'Udhampur' },
  { id: 348, value: 'kathua', label: 'Kathua' },
  { id: 349, value: 'bandipora', label: 'Bandipora' },
  { id: 350, value: 'baramulla', label: 'Baramulla' },
  { id: 351, value: 'shopian', label: 'Shopian' },
  { id: 352, value: 'kulgam', label: 'Kulgam' },
  { id: 353, value: 'samba', label: 'Samba' },
  { id: 354, value: 'reasi', label: 'Reasi' },
  { id: 355, value: 'poonch', label: 'Poonch' },
  { id: 356, value: 'rajouri', label: 'Rajouri' },
  { id: 357, value: 'jammu', label: 'Jammu' },
  { id: 358, value: 'srinagar', label: 'Srinagar' },
  { id: 359, value: 'anantnag', label: 'Anantnag' },
  { id: 360, value: 'pahalgam', label: 'Pahalgam' },
  { id: 361, value: 'udhampur', label: 'Udhampur' },
  { id: 362, value: 'kathua', label: 'Kathua' },
  { id: 363, value: 'bandipora', label: 'Bandipora' },
  { id: 364, value: 'baramulla', label: 'Baramulla' },
  { id: 365, value: 'shopian', label: 'Shopian' },
  { id: 366, value: 'kulgam', label: 'Kulgam' },
  { id: 367, value: 'samba', label: 'Samba' },
  { id: 368, value: 'reasi', label: 'Reasi' },
  { id: 369, value: 'poonch', label: 'Poonch' },
  { id: 370, value: 'rajouri', label: 'Rajouri' },
  { id: 371, value: 'jammu', label: 'Jammu' },
  { id: 372, value: 'srinagar', label: 'Srinagar' },
  { id: 373, value: 'anantnag', label: 'Anantnag' },
  { id: 374, value: 'pahalgam', label: 'Pahalgam' },
  { id: 375, value: 'udhampur', label: 'Udhampur' },
  { id: 376, value: 'kathua', label: 'Kathua' },
  { id: 377, value: 'bandipora', label: 'Bandipora' },
  { id: 378, value: 'baramulla', label: 'Baramulla' },
  { id: 379, value: 'shopian', label: 'Shopian' },
  { id: 380, value: 'kulgam', label: 'Kulgam' },
  { id: 381, value: 'samba', label: 'Samba' },
  { id: 382, value: 'reasi', label: 'Reasi' },
  { id: 383, value: 'poonch', label: 'Poonch' },
  { id: 384, value: 'rajouri', label: 'Rajouri' },
  { id: 385, value: 'jammu', label: 'Jammu' },
  { id: 386, value: 'srinagar', label: 'Srinagar' },
  { id: 387, value: 'anantnag', label: 'Anantnag' },
  { id: 388, value: 'pahalgam', label: 'Pahalgam' },
  { id: 389, value: 'udhampur', label: 'Udhampur' },
  { id: 390, value: 'kathua', label: 'Kathua' },
  { id: 391, value: 'bandipora', label: 'Bandipora' },
  { id: 392, value: 'baramulla', label: 'Baramulla' },
  { id: 393, value: 'shopian', label: 'Shopian' },
  { id: 394, value: 'kulgam', label: 'Kulgam' },
  { id: 395, value: 'samba', label: 'Samba' },
  { id: 396, value: 'reasi', label: 'Reasi' },
  { id: 397, value: 'poonch', label: 'Poonch' },
  { id: 398, value: 'rajouri', label: 'Rajouri' },
  { id: 399, value: 'jammu', label: 'Jammu' },
  { id: 400, value: 'srinagar', label: 'Srinagar' },
  { id: 401, value: 'anantnag', label: 'Anantnag' },
  { id: 402, value: 'pahalgam', label: 'Pahalgam' },
  { id: 403, value: 'udhampur', label: 'Udhampur' },
  { id: 404, value: 'kathua', label: 'Kathua' },
  { id: 405, value: 'bandipora', label: 'Bandipora' },
  { id: 406, value: 'baramulla', label: 'Baramulla' },
  { id: 407, value: 'shopian', label: 'Shopian' },
  { id: 408, value: 'kulgam', label: 'Kulgam' },
  { id: 409, value: 'samba', label: 'Samba' },
  { id: 410, value: 'reasi', label: 'Reasi' },
  { id: 411, value: 'poonch', label: 'Poonch' },
  { id: 412, value: 'rajouri', label: 'Rajouri' },
  { id: 413, value: 'jammu', label: 'Jammu' },
  { id: 414, value: 'srinagar', label: 'Srinagar' },
  { id: 415, value: 'anantnag', label: 'Anantnag' },
  { id: 416, value: 'pahalgam', label: 'Pahalgam' },
  { id: 417, value: 'udhampur', label: 'Udhampur' },
  { id: 418, value: 'kathua', label: 'Kathua' },
  { id: 419, value: 'bandipora', label: 'Bandipora' },
  { id: 420, value: 'baramulla', label: 'Baramulla' },
  { id: 421, value: 'shopian', label: 'Shopian' },
  { id: 422, value: 'kulgam', label: 'Kulgam' },
  { id: 423, value: 'samba', label: 'Samba' },
  { id: 424, value: 'reasi', label: 'Reasi' },
  { id: 425, value: 'poonch', label: 'Poonch' },
  { id: 426, value: 'rajouri', label: 'Rajouri' },
  { id: 427, value: 'jammu', label: 'Jammu' },
  { id: 428, value: 'srinagar', label: 'Srinagar' },
  { id: 429, value: 'anantnag', label: 'Anantnag' },
  { id: 430, value: 'pahalgam', label: 'Pahalgam' },
  { id: 431, value: 'udhampur', label: 'Udhampur' },
  { id: 432, value: 'kathua', label: 'Kathua' },
  { id: 433, value: 'bandipora', label: 'Bandipora' },
  { id: 434, value: 'baramulla', label: 'Baramulla' },
  { id: 435, value: 'shopian', label: 'Shopian' },
  { id: 436, value: 'kulgam', label: 'Kulgam' },
  { id: 437, value: 'samba', label: 'Samba' },
  { id: 438, value: 'reasi', label: 'Reasi' },
  { id: 439, value: 'poonch', label: 'Poonch' },
  { id: 440, value: 'rajouri', label: 'Rajouri' },
  { id: 441, value: 'jammu', label: 'Jammu' },
  { id: 442, value: 'srinagar', label: 'Srinagar' },
  { id: 443, value: 'anantnag', label: 'Anantnag' },
  { id: 444, value: 'pahalgam', label: 'Pahalgam' },
  { id: 445, value: 'udhampur', label: 'Udhampur' },
  { id: 446, value: 'kathua', label: 'Kathua' },
  { id: 447, value: 'bandipora', label: 'Bandipora' },
  { id: 448, value: 'baramulla', label: 'Baramulla' },
  { id: 449, value: 'shopian', label: 'Shopian' },
  { id: 450, value: 'kulgam', label: 'Kulgam' },
  { id: 451, value: 'samba', label: 'Samba' },
  { id: 452, value: 'reasi', label: 'Reasi' },
  { id: 453, value: 'poonch', label: 'Poonch' },
  { id: 454, value: 'rajouri', label: 'Rajouri' },
  { id: 455, value: 'jammu', label: 'Jammu' },
  { id: 456, value: 'srinagar', label: 'Srinagar' },
  { id: 457, value: 'anantnag', label: 'Anantnag' },
  { id: 458, value: 'pahalgam', label: 'Pahalgam' },
  { id: 459, value: 'udhampur', label: 'Udhampur' },
  { id: 460, value: 'kathua', label: 'Kathua' },
  { id: 461, value: 'bandipora', label: 'Bandipora' },
  { id: 462, value: 'baramulla', label: 'Baramulla' },
  { id: 463, value: 'shopian', label: 'Shopian' },
  { id: 464, value: 'kulgam', label: 'Kulgam' },
  { id: 465, value: 'samba', label: 'Samba' },
  { id: 466, value: 'reasi', label: 'Reasi' },
  { id: 467, value: 'poonch', label: 'Poonch' },
  { id: 468, value: 'rajouri', label: 'Rajouri' },
  { id: 469, value: 'jammu', label: 'Jammu' },
  { id: 470, value: 'srinagar', label: 'Srinagar' },
  { id: 471, value: 'anantnag', label: 'Anantnag' },
  { id: 472, value: 'pahalgam', label: 'Pahalgam' },
  { id: 473, value: 'udhampur', label: 'Udhampur' },
  { id: 474, value: 'kathua', label: 'Kathua' },
  { id: 475, value: 'bandipora', label: 'Bandipora' },
  { id: 476, value: 'baramulla', label: 'Baramulla' },
  { id: 477, value: 'shopian', label: 'Shopian' },
  { id: 478, value: 'kulgam', label: 'Kulgam' },
  { id: 479, value: 'samba', label: 'Samba' },
  { id: 480, value: 'reasi', label: 'Reasi' },
  { id: 481, value: 'poonch', label: 'Poonch' },
  { id: 482, value: 'rajouri', label: 'Rajouri' },
  { id: 483, value: 'jammu', label: 'Jammu' },
  { id: 484, value: 'srinagar', label: 'Srinagar' },
  { id: 485, value: 'anantnag', label: 'Anantnag' },
  { id: 486, value: 'pahalgam', label: 'Pahalgam' },
  { id: 487, value: 'udhampur', label: 'Udhampur' },
  { id: 488, value: 'kathua', label: 'Kathua' },
  { id: 489, value: 'bandipora', label: 'Bandipora' },
  { id: 490, value: 'baramulla', label: 'Baramulla' },
  { id: 491, value: 'shopian', label: 'Shopian' },
  { id: 492, value: 'kulgam', label: 'Kulgam' },
  { id: 493, value: 'samba', label: 'Samba' },
  { id: 494, value: 'reasi', label: 'Reasi' },
  { id: 495, value: 'poonch', label: 'Poonch' },
  { id: 496, value: 'rajouri', label: 'Rajouri' },
  { id: 497, value: 'jammu', label: 'Jammu' },
  { id: 498, value: 'srinagar', label: 'Srinagar' },
  { id: 499, value: 'anantnag', label: 'Anantnag' },
  { id: 500, value: 'pahalgam', label: 'Pahalgam' },
  { id: 501, value: 'udhampur', label: 'Udhampur' },
  { id: 502, value: 'kathua', label: 'Kathua' },
  { id: 503, value: 'bandipora', label: 'Bandipora' },
  { id: 504, value: 'baramulla', label: 'Baramulla' },
  { id: 505, value: 'shopian', label: 'Shopian' },
  { id: 506, value: 'kulgam', label: 'Kulgam' },
  { id: 507, value: 'samba', label: 'Samba' },
  { id: 508, value: 'reasi', label: 'Reasi' },
  { id: 509, value: 'poonch', label: 'Poonch' },
  { id: 510, value: 'rajouri', label: 'Rajouri' },
  { id: 511, value: 'jammu', label: 'Jammu' },
  { id: 512, value: 'srinagar', label: 'Srinagar' },
  { id: 513, value: 'anantnag', label: 'Anantnag' },
  { id: 514, value: 'pahalgam', label: 'Pahalgam' },
  { id: 515, value: 'udhampur', label: 'Udhampur' },
  { id: 516, value: 'kathua', label: 'Kathua' },
  { id: 517, value: 'bandipora', label: 'Bandipora' },
  { id: 518, value: 'baramulla', label: 'Baramulla' },
  { id: 519, value: 'shopian', label: 'Shopian' },
  { id: 520, value: 'kulgam', label: 'Kulgam' },
  { id: 521, value: 'samba', label: 'Samba' },
  { id: 522, value: 'reasi', label: 'Reasi' },
  { id: 523, value: 'poonch', label: 'Poonch' },
  { id: 524, value: 'rajouri', label: 'Rajouri' },
  { id: 525, value: 'jammu', label: 'Jammu' },
  { id: 526, value: 'srinagar', label: 'Srinagar' },
  { id: 527, value: 'anantnag', label: 'Anantnag' },
  { id: 528, value: 'pahalgam', label: 'Pahalgam' },
  { id: 529, value: 'udhampur', label: 'Udhampur' },
  { id: 530, value: 'kathua', label: 'Kathua' },
  { id: 531, value: 'bandipora', label: 'Bandipora' },
  { id: 532, value: 'baramulla', label: 'Baramulla' },
  { id: 533, value: 'shopian', label: 'Shopian' },
  { id: 534, value: 'kulgam', label: 'Kulgam' },
  { id: 535, value: 'samba', label: 'Samba' },
  { id: 536, value: 'reasi', label: 'Reasi' },
  { id: 537, value: 'poonch', label: 'Poonch' },
  { id: 538, value: 'rajouri', label: 'Rajouri' },
  { id: 539, value: 'jammu', label: 'Jammu' },
  { id: 540, value: 'srinagar', label: 'Srinagar' },
  { id: 541, value: 'anantnag', label: 'Anantnag' },
  { id: 542, value: 'pahalgam', label: 'Pahalgam' },
  { id: 543, value: 'udhampur', label: 'Udhampur' },
  { id: 544, value: 'kathua', label: 'Kathua' },
  { id: 545, value: 'bandipora', label: 'Bandipora' },
  { id: 546, value: 'baramulla', label: 'Baramulla' },
  { id: 547, value: 'shopian', label: 'Shopian' },
  { id: 548, value: 'kulgam', label: 'Kulgam' },
  { id: 549, value: 'samba', label: 'Samba' },
  { id: 550, value: 'reasi', label: 'Reasi' },
  { id: 551, value: 'poonch', label: 'Poonch' },
  { id: 552, value: 'rajouri', label: 'Rajouri' },
  { id: 553, value: 'jammu', label: 'Jammu' },
  { id: 554, value: 'srinagar', label: 'Srinagar' },
  { id: 555, value: 'anantnag', label: 'Anantnag' },
  { id: 556, value: 'pahalgam', label: 'Pahalgam' },
  { id: 557, value: 'udhampur', label: 'Udhampur' },
  { id: 558, value: 'kathua', label: 'Kathua' },
  { id: 559, value: 'bandipora', label: 'Bandipora' },
  { id: 560, value: 'baramulla', label: 'Baramulla' },
  { id: 561, value: 'shopian', label: 'Shopian' },
  { id: 562, value: 'kulgam', label: 'Kulgam' },
  { id: 563, value: 'samba', label: 'Samba' },
  { id: 564, value: 'reasi', label: 'Reasi' },
  { id: 565, value: 'poonch', label: 'Poonch' },
  { id: 566, value: 'rajouri', label: 'Rajouri' },
  { id: 567, value: 'jammu', label: 'Jammu' },
  { id: 568, value: 'srinagar', label: 'Srinagar' },
  { id: 569, value: 'anantnag', label: 'Anantnag' },
  { id: 570, value: 'pahalgam', label: 'Pahalgam' },
  { id: 571, value: 'udhampur', label: 'Udhampur' },
  { id: 572, value: 'kathua', label: 'Kathua' },
  { id: 573, value: 'bandipora', label: 'Bandipora' },
  { id: 574, value: 'baramulla', label: 'Baramulla' },
  { id: 575, value: 'shopian', label: 'Shopian' },
  { id: 576, value: 'kulgam', label: 'Kulgam' },
  { id: 577, value: 'samba', label: 'Samba' },
  { id: 578, value: 'reasi', label: 'Reasi' },
  { id: 579, value: 'poonch', label: 'Poonch' },
  { id: 580, value: 'rajouri', label: 'Rajouri' },
  { id: 581, value: 'jammu', label: 'Jammu' },
  { id: 582, value: 'srinagar', label: 'Srinagar' },
  { id: 583, value: 'anantnag', label: 'Anantnag' },
  { id: 584, value: 'pahalgam', label: 'Pahalgam' },
  { id: 585, value: 'udhampur', label: 'Udhampur' },
  { id: 586, value: 'kathua', label: 'Kathua' },
  { id: 587, value: 'bandipora', label: 'Bandipora' },
  { id: 588, value: 'baramulla', label: 'Baramulla' },
  { id: 589, value: 'shopian', label: 'Shopian' },
  { id: 590, value: 'kulgam', label: 'Kulgam' },
  { id: 591, value: 'samba', label: 'Samba' },
  { id: 592, value: 'reasi', label: 'Reasi' },
  { id: 593, value: 'poonch', label: 'Poonch' },
  { id: 594, value: 'rajouri', label: 'Rajouri' },
  { id: 595, value: 'jammu', label: 'Jammu' },
  { id: 596, value: 'srinagar', label: 'Srinagar' },
  { id: 597, value: 'anantnag', label: 'Anantnag' },
  { id: 598, value: 'pahalgam', label: 'Pahalgam' },
  { id: 599, value: 'udhampur', label: 'Udhampur' },
  { id: 600, value: 'kathua', label: 'Kathua' },
  { id: 601, value: 'bandipora', label: 'Bandipora' },
  { id: 602, value: 'baramulla', label: 'Baramulla' },
  { id: 603, value: 'shopian', label: 'Shopian' },
  { id: 604, value: 'kulgam', label: 'Kulgam' },
  { id: 605, value: 'samba', label: 'Samba' },
  { id: 606, value: 'reasi', label: 'Reasi' },
  { id: 607, value: 'poonch', label: 'Poonch' },
  { id: 608, value: 'rajouri', label: 'Rajouri' },
  { id: 609, value: 'jammu', label: 'Jammu' },
  { id: 610, value: 'srinagar', label: 'Srinagar' },
  { id: 611, value: 'anantnag', label: 'Anantnag' },
  { id: 612, value: 'pahalgam', label: 'Pahalgam' },
  { id: 613, value: 'udhampur', label: 'Udhampur' },
  { id: 614, value: 'kathua', label: 'Kathua' },
  { id: 615, value: 'bandipora', label: 'Bandipora' },
  { id: 616, value: 'baramulla', label: 'Baramulla' },
  { id: 617, value: 'shopian', label: 'Shopian' },
  { id: 618, value: 'kulgam', label: 'Kulgam' },
  { id: 619, value: 'samba', label: 'Samba' },
  { id: 620, value: 'reasi', label: 'Reasi' },
  { id: 621, value: 'poonch', label: 'Poonch' },
  { id: 622, value: 'rajouri', label: 'Rajouri' },
  { id: 623, value: 'jammu', label: 'Jammu' },
  { id: 624, value: 'srinagar', label: 'Srinagar' },
  { id: 625, value: 'anantnag', label: 'Anantnag' },
  { id: 626, value: 'pahalgam', label: 'Pahalgam' },
  { id: 627, value: 'udhampur', label: 'Udhampur' },
  { id: 628, value: 'kathua', label: 'Kathua' },
  { id: 629, value: 'bandipora', label: 'Bandipora' },
  { id: 630, value: 'baramulla', label: 'Baramulla' },
  { id: 631, value: 'shopian', label: 'Shopian' },
  { id: 632, value: 'kulgam', label: 'Kulgam' },
  { id: 633, value: 'samba', label: 'Samba' },
  { id: 634, value: 'reasi', label: 'Reasi' },
  { id: 635, value: 'poonch', label: 'Poonch' },
  { id: 636, value: 'rajouri', label: 'Rajouri' },
  { id: 637, value: 'jammu', label: 'Jammu' },
  { id: 638, value: 'srinagar', label: 'Srinagar' },
  { id: 639, value: 'anantnag', label: 'Anantnag' },
  { id: 640, value: 'pahalgam', label: 'Pahalgam' },
  { id: 641, value: 'udhampur', label: 'Udhampur' },
  { id: 642, value: 'kathua', label: 'Kathua' },
  { id: 643, value: 'bandipora', label: 'Bandipora' },
  { id: 644, value: 'baramulla', label: 'Baramulla' },
  { id: 645, value: 'shopian', label: 'Shopian' },
  { id: 646, value: 'kulgam', label: 'Kulgam' },
  { id: 647, value: 'samba', label: 'Samba' },
  { id: 648, value: 'reasi', label: 'Reasi' },
  { id: 649, value: 'poonch', label: 'Poonch' },
  { id: 650, value: 'rajouri', label: 'Rajouri' },
  { id: 651, value: 'jammu', label: 'Jammu' },
  { id: 652, value: 'srinagar', label: 'Srinagar' },
  { id: 653, value: 'anantnag', label: 'Anantnag' },
  { id: 654, value: 'pahalgam', label: 'Pahalgam' },
  { id: 655, value: 'udhampur', label: 'Udhampur' },
  { id: 656, value: 'kathua', label: 'Kathua' },
  { id: 657, value: 'bandipora', label: 'Bandipora' },
  { id: 658, value: 'baramulla', label: 'Baramulla' },
  { id: 659, value: 'shopian', label: 'Shopian' },
  { id: 660, value: 'kulgam', label: 'Kulgam' }
]


const Home = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null
  })

  const [userInput , setUserInput] = useState("")
  const [serachInput,setSearchInput] = useState(["Hyderabad"])
  const [toggle, setToggle] = useState(false)
  const [citySearch,setSearchCity] = useState([])
  const [multipleCityNames,setMultipleCityNames] = useState([])

  useEffect(() => {
    const renderWheatherInfoData  = async () => {
      const responses = await Promise.allSettled(serachInput.map(async (search) => {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}&units=metric
`)
        const resData = await res.json()
        return resData
      }))
      if(responses.length > 0 ){
        const responseDataModification = responses.map((each) => each.value)
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
          data: responseDataModification
        }))
      }else{
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.failure,
        }))
      
      }
      setMultipleCityNames([])
    }
    renderWheatherInfoData()
  },[serachInput])

  useEffect(() => {
     const success = (positions) => {
        const {latitude,longitude} = positions.coords
        const getAddress = async () => {
          const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
          const response = await fetch(url)
          const data = await response.json()
          setSearchInput([data[0].name])
        }

        getAddress()
     }

     const failure = () => {
       console.log("error")
     }

    navigator.geolocation.getCurrentPosition(success,failure)
  },[])



  const renderLoadingView = () => {
    return "Loading"
  }

  const renderSuccessView = () => {
    const {data} = apiResponse
    const CurrentDateTime = new Date()
    return (<>
      {data.map((each,index) => {
        if(each.cod === 200){

           return <div className="card" key={index}>
           <p className="figers"> Current location:  <span className="current-location">{each.name}</span></p>
           <p className="figers"> Temperature:  <span className="temperature">{(each.main.temp)} {"  "}  Degrees</span> </p>
           <p className="figers"> Date and time:  <span className="datetime">{CurrentDateTime.toLocaleString()}</span> </p>
           <p className="figers"> Humidity:  <span className="text">{each.main.humidity}%</span> </p>
           <p className="figers"> Wind Speed:  <span className="text">{each.wind.speed} {"  "} meter/sec	</span> </p>
      </div>
        }
        return <div className="card" key={each.index} >
               <p>*{each.message}*</p> 
               <p>Sorry We have no data for this Location.</p>
        </div>
      })}
      
      </>)
  }

  const renderFailureView = () => {
    return <div> <p>Please Enter A valid City name!!</p> </div>
  }
  
  const renderWheatherInfo = () => {
    const { status } = apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null;
    }
  }

  const onChangeUserInput  = (event) => {
      setUserInput(event.target.value)
      const searchCityFilter = indianCities.filter((eachCity) => (eachCity.value.toLowerCase()).startsWith((event.target.value).toLowerCase()))
      setSearchCity(searchCityFilter)
  }

  const onClickSearch = () => {
    
       if (userInput.length > 2){
        setSearchInput([...multipleCityNames,userInput])
       }else{
        setSearchInput(multipleCityNames)
       }
       
       setSearchCity([])
       setUserInput("")
  }

  const onChlickToggle = () => {
    setToggle((prevState) => (!prevState))
  }
  const  addingCityNames = (event) => {
     const uniqueCityNames = multipleCityNames.find((each) => each === event.target.value)
     if (uniqueCityNames === undefined){
        setMultipleCityNames((prevState) => [...prevState,event.target.value])
     }
     setUserInput("")
     document.getElementById("inputField").focus()
     setSearchCity([])
     
  }
  const onClickRemoveCity = (event) => {
      const filterdedCities = multipleCityNames.filter((city) => city !== event.target.value)
      setMultipleCityNames(filterdedCities)
  }
  
  return (<div className={toggle ? "home-bg-black" : "home-page-bgcontainer"}>
    <nav className= {toggle ? "nav nav-color" : "nav"} >
      <h1 className="nav-heading">Weather Information</h1> 
      <button className="switch-button" onClick={onChlickToggle}> {toggle ? "Switch Light" : "Switch Dark" }</button>
    </nav>
    
    <div className="searchbar-container">
     {multipleCityNames.length > 0 && <ul className="multi-city-names">{multipleCityNames.map((cities,index) => <li className="citi" key={index}> {cities.toUpperCase()}<button className="remove-button" type="button" value={cities} onClick={onClickRemoveCity}>X</button></li>)}</ul>}
      <div className="search-bar">
        <input className="input" id="inputField" value={userInput}  onChange={onChangeUserInput} type="text" placeholder="Serach your city name" />
        <button onClick={onClickSearch} className="search-button">Search</button>
      </div>
    </div>
    {citySearch.length > 0 && <ul className="search-dropdown">{citySearch.map((eachName,index) => <li key={index} className="city-option"><button type="button"  onClick={addingCityNames} className="responseDataModification" value={eachName.value}>{eachName.label}</button></li>)}</ul>}
    <div className="wheather-bgcontainer">
    {renderWheatherInfo()}
    </div>
    </div> )
}

export default Home