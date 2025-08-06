document.addEventListener("DOMContentLoaded", () => {
  const subminBtn = document.getElementById("form");
  subminBtn.addEventListener("submit", (e)=>{
    const name = document.getElementById("name").value;
    console.log(name);
   
    e.preventDefault();
    alert("Thank you for your message, "+ name);
    subminBtn.reset();
  })

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
    skillDiv.className = "skill-card";

skillDiv.innerHTML = `
  <img src="${skill.image}" alt="${skill.name}" class="skill-image">
  <div class="skill-info">
    <strong>${skill.name}</strong>

  </div>
`;


    container.appendChild(skillDiv);
  });

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
