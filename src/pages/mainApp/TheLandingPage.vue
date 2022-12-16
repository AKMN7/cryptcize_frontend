<template>
  <section class="landing__page">
    <header id="about" class="header">
      <div class="header__menu">
        <img src="../../img/Cryptcize_Logo_Small.png" alt="cryptcize logo" />

        <div class="header__menu-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#product">Product</a>
          <a href="#storeis">Stories</a>
        </div>
        <div class="header__menu-auth">
          <button @click="navigatePage('signin')">Sign in</button>
          <button @click="navigatePage('signup')">Register &rarr;</button>
        </div>
      </div>

      <div class="header__main">
        <div class="header__main-text">
          <h2>Accelerate your knowledge with crypto today.</h2>
          <p>
            Cryptcize is a free tool built to serve as a starting point for
            those interested in cryptocurrencies. It allows them to get familiar
            with all the significant concepts while avoiding complications.
          </p>
          <button @click="navigatePage('signup')">Get Started &rarr;</button>
        </div>
        <div class="header__main-img">
          <img src="../../img/undraw_crypto_portfolio_2jy5.svg" alt="crypto" />
        </div>
      </div>
    </header>

    <section id="features" class="features">
      <div class="section__title">
        <h1>Why should you choose Cryptcize?</h1>
      </div>

      <div class="features__container">
        <div class="card">
          <ion-icon name="earth-outline"></ion-icon>
          <h4>Real-Time</h4>
          <p>
            Cryptcize provides a real-time engaging experience. Information such
            as prices, market cap, volume, and much more are all real-time.
          </p>
        </div>

        <div class="card">
          <ion-icon name="sunny-outline"></ion-icon>
          <h4>Simple</h4>
          <p>
            Cryptcize does the best job of providing a simple UI & UX so users
            can obtain data and understand it with no confusion and with total
            easiness.
          </p>
        </div>

        <div class="card">
          <ion-icon name="file-tray-full-outline"></ion-icon>
          <h4>Comprehinsive</h4>
          <p>
            Cryptcize focuses on providing a comprehensive set of data. Trending
            coins, community fear and greed index top, and top coins can all be
            obtained in one place!
          </p>
        </div>

        <div class="card">
          <ion-icon name="chatbox-ellipses-outline"></ion-icon>
          <h4>Opinionated</h4>
          <p>
            Cryptcize gives the opportunity to all its users whether experts or
            not to share or view opinions about any coin/token of their choice
            with ease.
          </p>
        </div>
      </div>
    </section>

    <section id="product" class="blog">
      <div class="section__title">
        <h1>Built to exaclty meet your needs.</h1>
        <p>
          Cryptcize considers itself to be an optimal solution for crypto
          beginners. Think of it as a tool that helps users get engaged with one
          of the most trending topics recently, crypto. Not to mention that
          cryptcize is completly responsive, you can use it from your mobile
          browser as well.
        </p>
      </div>
      <div class="blog__imgs">
        <img
          class="laptop"
          src="../../img/MockUp_Desktop.png"
          alt="LaptopVersion"
        />
        <img
          class="mobile"
          src="../../img/MockUp_Mobile.png"
          alt="LaptopVersion"
        />
      </div>
    </section>

    <section id="storeis" class="storeis">
      <div class="section__title">
        <h1>We help people start their crypto journies.</h1>
      </div>
      <div class="storeis__container">
        <div class="story">
          <img
            src="https://images.unsplash.com/photo-1584999734482-0361aecad844?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlciUyMHBob3RvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="user"
          />
          <h4>Jason Mount</h4>
          <p>
            "Before Cryptcize, I knew nothing about crypto. Cryptcize helped me
            to start this amazing journey by simplifying everything to me."
          </p>
        </div>

        <div class="story">
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="user"
          />
          <h4>Khaled Ali</h4>
          <p>
            "I appreciate how Cryptcize is designed, the user interface is so
            csimple which helps in grabbing data fast and easy a lot in this
            field."
          </p>
        </div>

        <div class="story">
          <img
            src="https://images.unsplash.com/photo-1597248374161-426f0d6d2fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80"
            alt="user"
          />
          <h4>Donna Specter</h4>
          <p>
            "Having all the important facts is great. Cryptcize gives me views,
            trending currencies, and the fear and greed index all in one place."
          </p>
        </div>
      </div>
    </section>

    <section id="farewell" class="farewell">
      <div class="section__title">
        <h1>
          Say goodbye to complecations, frustration and <span>confusion</span>.
        </h1>
        <p>
          Start you crypto journey with cryptcize. Get insights, opinions,
          information and much more all in one place for free. <br />
          What are you waiting for? Sign up and get started!
        </p>
        <button @click="navigatePage('signup')">Get Started &rarr;</button>
      </div>
    </section>

    <footer id="footer" class="footer">
      <div class="footer__img">
        <img src="../../img/Cryptcize_Logo.png" alt="Cryptcize" />
      </div>
      <div class="footer__data">
        <div class="links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#product">Product</a>
          <a href="#storeis">Stories</a>
        </div>
        <div class="message">
          ANAS KHALEEL MAHMOUD NASSAR (TP057388), a BSc (Hons) in Software
          Engineering student at Asia Pacific University of Technology and
          Innovation, created Cryptcize. Cryptcize is supposed to be my final
          year project (FYP). It was a fascinating experience putting this
          project together. Special thanks to my family, who have supported me
          throughout my academic career; I adore you guys ❤.
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    function navigatePage(value) {
      if (value == "signin") router.push(`/signin`);
      if (value == "signup") router.push(`/signup`);
    }
    return { navigatePage };
  },
};
</script>