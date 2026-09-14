import Course from '../models/Course.js';

const courses = [
  [1,'⚛️','React.js Development','3 Months','Intermediate',1,'Master React.js with Hooks, Context API, React Router, Tailwind CSS, API integration, and real-world projects.'],
  [2,'🌐','MERN Stack Development','6 Months','Advanced',1,'Become a Full Stack Developer by learning MongoDB, Express.js, React.js, Node.js, REST APIs, Authentication, and Deployment.'],
  [3,'☕','Java Full Stack','6 Months','Beginner',1,'Learn Core Java, Advanced Java, JDBC, Servlets, JSP, MySQL, HTML, CSS, JavaScript, and build enterprise applications.'],
  [4,'🐍','Python Programming','3 Months','Beginner',1,'Build a strong programming foundation with Python, OOP, File Handling, Automation, APIs, and real-world coding projects.'],
  [5,'🤖','Artificial Intelligence & ML','6 Months','Advanced',1,'Learn Artificial Intelligence, Machine Learning, Data Science, TensorFlow, Pandas, NumPy, and Scikit-Learn through practical projects.'],
  [6,'📱','Flutter App Development','4 Months','Intermediate',1,'Develop beautiful Android & iOS applications using Flutter, Dart, Firebase, REST APIs, and modern UI design.'],
  [7,'🎨','UI/UX Design','2 Months','Beginner',1,'Learn Figma, Wireframing, Prototyping, User Research, Design Systems, and create stunning user experiences.'],
  [8,'☁️','Cloud Computing','5 Months','Advanced',1,'Master AWS, Azure, Google Cloud, Docker, Kubernetes, CI/CD, and cloud deployment with hands-on practice.'],
  [9,'🛡️','Cyber Security','5 Months','Advanced',1,'Learn Ethical Hacking, Network Security, Penetration Testing, Kali Linux, OWASP, and Cyber Security fundamentals.']
];

export const seedCourses = async () => {
  for (const [frontendId, icon, title, duration, level, price, description] of courses) {
    await Course.updateOne({ frontendId }, { frontendId, icon, title, duration, level, price, description }, { upsert: true });
  }
};
