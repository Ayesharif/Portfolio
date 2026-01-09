document.addEventListener("DOMContentLoaded", () => {



  // const elements = document.querySelectorAll(".animatedDiv");

  // elements.forEach((el, index) => {
  //   setTimeout(() => {
  //     el.classList.add("visible");
  //   }, index * 200);   // تھوڑا تھوڑا delay سے zoom-in effect
  // });


const projects=[
  {
name:"Swapy (Olx clone)",
type:"Mern stack",
image:'./images/swapy.png',
live:"https://swapy-three.vercel.app/"
},
  {
name:"Friend Chat (chat app)",
type:"Mern Stack",
image:'./images/friendChat.PNG',
frontend:"https://github.com/Ayesharif/friends-chat",
backend:"https://github.com/Ayesharif/friends-chat-backend"
},
{
  name:"minimart (E-commerce app)",
  type:"Mern Stack",
  image:'./images/minimart.PNG',
  frontend:"https://github.com/Ayesharif/minimart",
  backend:"https://github.com/Ayesharif/minimart-backend"
},
  {
name:"EventSphere (Events showcase)",
type:"Front End",
image:'./images/eventsphare.PNG',
live:"https://event-sphere-wheat.vercel.app/"
},
  {
name:"Dreamly (Travel and Tours)",
type:"Front End",
image:'./images/dreamly.PNG',
live:"https://dreamly-five.vercel.app/"
},
  {
name:"Shopora (E-Commerce app)",
type:"Front End",
image:'./images/shopora.PNG',
live:"https://shopora-tau.vercel.app/"
},
]


const skills = [
  {
    name: "HTML",
    level: "90%",
    image: "images/html.png"
  },
  {
    name: "CSS",
    level: "70%",
image: "images/css-3.png"
  },
  {
    name: "Javascript",
    level: "75%",
image: "images/js.png"
  },
  {
    name: "Bootstrap",
    level: "60%",
image: "images/bootstrap.png"
  }
  ,
  {
    name: "Php",
    level: "75%",
image: "images/php.png"
  }
  ,
  {
    name: "MySql",
    level: "80%",
image: "images/mysql.png"
  }
  ,
  {
    name: "React",
    level: "70%",
image: "images/physics.png"
  }
  ,
  {
    name: "Tailwind",
    level: "50%",
image: "images/tailwindcss.png"
  }
  ,
  {
    name: "Mongodb",
    level: "50%",
image: "images/mongo.png"
  }
  ,
  {
    name: "MS office",
    level: "70%",
image: "images/ms-office.png"
  }
  ,
  {
    name: "Flutter",
    level: "40%",
image: "images/flutter.png"
  }
  ,
  {
    name: "Firebase",
    level: "55%",
image: "images/firebase.png"
  }
  ,
  {
    name: "Supabase",
    level: "40%",
image: "images/supabase.png"
  }
];


  const container = document.getElementById("skills-container");

  skills.forEach(skill => {
    const skillDiv = document.createElement("div");
    skillDiv.className = "skill-card animatedDiv";

    skillDiv.innerHTML = `
      <img src="${skill.image}" class="skill-image">
      <div class="skill-info">
        <strong>${skill.name}</strong> (${skill.level})
        <div class="progress-bar">
          <div class="progress" data-level="${skill.level}"></div>
        </div>
      </div>
    `;

    container.appendChild(skillDiv);
  });
const Projectcontainer = document.getElementById("myProject");

projects.forEach(project => {
  const projectDiv = document.createElement("div");
  projectDiv.className = "project animatedDiv";

  // Base HTML
  projectDiv.innerHTML = `
    <div class="project-img">
      <img src="${project.image}" alt="">
    </div>

    <div class="pro-description">
      <p class="title">${project.name}</p>
      <p class="type">${project.type}</p>
      <div class="project-links"></div>
    </div>
  `;

  const linksDiv = projectDiv.querySelector(".project-links");

  // If live link exists
  if (project.live) {
    linksDiv.innerHTML = `
      <a href="${project.live}" target="_blank">Preview</a>
    `;
  } 
  // Otherwise show frontend & backend
  else {
    linksDiv.innerHTML = `
      <a href="${project.frontend}" target="_blank">Frontend</a>
      <a href="${project.backend}" target="_blank">Backend</a>
    `;
  }

  Projectcontainer.appendChild(projectDiv);
});

  // ================= SCROLL ANIMATION =================

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll(".animatedDiv").forEach(el => {
    observer.observe(el);
  });

  // Progress bar animation when visible
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll(".progress");
        bars.forEach(bar => {
          bar.style.width = bar.dataset.level;
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  progressObserver.observe(container);

setTimeout(() => {
  document.querySelectorAll(".progress").forEach(bar => {
    const level = bar.getAttribute("data-level");
    bar.style.width = level;
  });
}, 200);

const scrollToTopBtn = document.getElementById("scrollToTopBtn");


window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});


scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


});
