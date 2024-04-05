<a name="readme-top"></a>

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- ScreenShot Here -->
  <!-- <a href="https://github.com/jduriu/yahtzee">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

<h3 align="center">Jon's Yahtzee Game</h3>

  <p align="center">
    A tribute to the classic Hasbro dice game that brought me many happy memories growing up!
    <br />
    <a href="https://github.com/jduriu/yahtzee"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- DEPLOYED LINK HERE -->
    <!-- <a href="[deployed url]">View Deployed Site</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This game is a culmination of many new principles I wanted to learn. I wanted to push myself to better learn full stack engineering including using modern frameworks like NextJS and FastAPI, microservice architecture using Docker, authentication and authorization best practices, and ultimately deployment to a cloud provider.

While the end product is a simple dice game, my hope is that underneath lies a well-built fully-functional application.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![FastAPI][FastAPI]][FastAPI-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![TailwindCSS][TailwindCSS]][Tailwind-url]
* [![Docker][Docker]][Docker-url]
<!-- * [![AWS][AWS]][AWS-url] -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Docker
  <div>
    <a href="https://www.docker.com/get-started/">Docker Installation Guide</a>
  </div>


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jduriu/yahtzee.git
   ```
2. Create external volumes in Docker for local development
  * Using Docker CLI
    ```sh
    docker volume create yahtzee_db
    docker volume create accounts_db
    ```

3. Run docker compose
  * cd into the root folder of the project
    ```sh
    docker compose build
    docker compose up
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This application can be used either signed in or as a guest.

<!-- Add additional usage steps in this section once completed -->

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


https://www.docker.com/get-started/
<!-- ROADMAP -->
## Roadmap

- Backend
- Frontend

See the [open issues](https://github.com/jduriu/yahtzee/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Jon Uriu - uriujon@gmail.com

Project Link: [https://github.com/jduriu/yahtzee](https://github.com/jduriu/yahtzee)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jduriu/yahtzee.svg?style=for-the-badge
[contributors-url]: https://github.com/jduriu/yahtzee/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jduriu/yahtzee.svg?style=for-the-badge
[forks-url]: https://github.com/jduriu/yahtzee/network/members
[stars-shield]: https://img.shields.io/github/stars/jduriu/yahtzee.svg?style=for-the-badge
[stars-url]: https://github.com/jduriu/yahtzee/stargazers
[issues-shield]: https://img.shields.io/github/issues/jduriu/yahtzee.svg?style=for-the-badge
[issues-url]: https://github.com/jduriu/yahtzee/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/jonathan-uriu/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Tailwind-url]: https://tailwindcss.com/
[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Docker-url]: https://www.docker.com/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[AWS-url]: https://www.aws.amazon.com/
[AWS]: https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[MongoDB]:   https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[FastAPI-url]: https://fastapi.tiangolo.com/
[FastAPI]:   https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
