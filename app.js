const express = require("express");
const cors = require("cors");
const app = express();

const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === "development";

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

const db = {
  safe_spaces: [
    {
      id: 1,
      name: "Los Angeles LGBT Center-WeHo",
      url: "https://lalgbtcenter.org/",
      address: "8745 Santa Monica Blvd., West Hollywood, CA 90069",
      body:
        "The Los Angeles LGBT Center is a provider of programs and services for lesbian, gay, bisexual and transgender people. The organization's work spans four categories, including health, social services, housing, and leadership and advocacy."
    },
    {
      id: 2,
      name: "Trans Wellness Center",
      url: "https://mytranswellness.org/",
      address: "3055 Wilsshire Blvd., Suite 360 Los Angeles, CA 90010",
      body:
        "The Trans Wellness Center (TWC) provides comprehensive resources and services for transgender and non-binary people under one roof. The 3,000-square-foot center is the first-of-its-kind in the United States, with six local organizations joining forces to create this new home for wellness. The TWC was conceived and created by community leaders and allies, honoring their lifelong dedication to raise awareness about the needs and the contributions of the transgender community."
    },
    {
      id: 3,
      name: "ProjectQ Salon",
      url: "https://www.projectq.me/",
      address: "818 N Spring St #101, Los Angeles, CA 90012s",
      body:
        "ProjectQ Salon is queer poc owned and operated hair salon. We pride ourselves on being 100% inclusive and a safe space where everyone is welcome; regardless of race, gender, sexual orientation, size, ability, and income. Our stylists are highly skilled in curly hair, qpoc/poc hair, short hair, extreme color and gender affirming hair cuts!"
    },
    {
      id: 4,
      name: "Ostbahnhof",
      url: "https://www.ostbahnhof.club/",
      address: "n/a",
      body:
        "OSTBAHNHOF creates safer spaces where all LGBTQI people revel in high sensory life. Part of the proceeds generated from our events are donated to LGBTQI freedom organizations and / or queer people in need."
    },
    {
      id: 5,
      name: "Mi Centro - Los Angeles LGBT Center",
      url: "https://lalgbtcenter.org/about-the-center/mi-centro",
      address: "553 S Clarence St, Los Angeles, CA 90033",
      body:
        "Since 1969 the Los Angeles LGBT Center has cared for, championed, and celebrated LGBT individuals and families in Los Angeles and beyond. Today the Center's nearly 700 employees provide services for more LGBT people than any other organization in the world, offering programs, services, and global advocacy that span four broad categories: Health, Social Services and Housing, Culture and Education, Leadership and Advocacy."
    },
    {
      id: 6,
      name: "Cuties",
      url: "https://hicuties.com/",
      address: "710 N Heliotrope Dr, Los Angeles, CA 90029",
      body:
        "In most cities, the lion’s share of LGBTQ-centered establishments are bars and clubs that primarily cater to gay men who are cisgender which means their gender identity matches the sex they were assigned at birth. Greater L.A. is no exception [...] Given this void, Cuties has quickly become the daytime darling of L.A.’s queer social ecosystem."
    }
  ]
};

app.get("/api/safe_spaces", (request, response) => {
  response.json(db.safe_spaces);
});

app.post("/api/safe_spaces", (request, response) => {
  const post = request.body;
  post.id = db.safe_spaces.length + 1;
  db.safe_spaces.push(post);
  response.json(post);
});

app.get("/api/safe_spaces/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.safe_spaces.find(post => {
    return post.id === id;
  });

  if (post) {
    response.json(post);
  } else {
    response.status(404).send();
  }
});

app.delete("/api/safe_spaces/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.safe_spaces.find(post => {
    return post.id === id;
  });

  if (post) {
    db.safe_spaces = db.safe_spaces.filter(post => {
      return post.id !== id;
    });
    response.status(204).send();
  } else {
    response.status(404).send();
  }
});

app.put("/api/safe_spaces/:id", (request, response) => {
  const id = Number(request.params.id);
  const post = db.safe_spaces.find(post => {
    return post.id === id;
  });

  if (post) {
    Object.assign(post, request.body);
    response.json(post);
  } else {
    response.status(404).send();
  }
});

// comments
// have to also find out how to upload to right website

// finished

app.listen(PORT || 8000);
