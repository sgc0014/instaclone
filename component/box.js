import Input from "./input";

function Box() {
  return (
    <div className={styles.box}>
      <div className={styles.formContainer}>
        <h1 className={styles.instaHeader}>
          {" "}
          <img
            className={styles.instagram}
            src="/static/instagram.png"
            alt=""
          />
        </h1>

        <button className={styles.button}>Log In</button>

        <div className={styles.border}>
          <div className={styles.hr}></div>
          <div className={styles.middle}>OR</div>
          <div className={styles.hr}></div>
        </div>
        <button className={styles.facebook}>
          <span className={styles.fbLogo}>
            <AiFillFacebook size="1.5em" />
          </span>
          <span className={styles.fbLink}>Log in with Facebook</span>
        </button>
        <a href="#" className={styles.forgotPassword}>
          Forgot Password?
        </a>
      </div>
      <div className={styles.smallBox}>
        <p>
          Don't have an account?
          <a href="#" className={styles.signUpLink}>
            Sign up
          </a>
        </p>
      </div>
      <div className={styles.appLink}>
        <p>Get the app.</p>
        <a href="#">
          <img className={styles.store} src="/static/appleStore.png" />
        </a>

        <a href="#">
          <img className={styles.store} src="/static/androidStore.png" />
        </a>
      </div>
    </div>
  );
}

export default box;
