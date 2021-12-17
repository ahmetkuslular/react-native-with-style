import React from "react";
import Layout from "@theme/Layout";

import CopySvg from "@site/static/svg/copy.svg";
import PhoneImage from "@site/static/img/main.png";
import BatImage from "@site/static/img/bat.png";
import Link from "@docusaurus/Link";
import styles from "../css/header.module.css";

function Content() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <section className={styles.hero}>
          <div className={styles.phoneImageWrapperOnLeft}>
            <img src={PhoneImage} style={{ maxHeight: 450 }} />
          </div>
          <div className={styles.heroWrapper}>
            <img src={BatImage} style={{ maxHeight: 120 }} />
            <h1 className={styles.heading}>
              Your eyes can deceive you; don’t trust them.
            </h1>
            <h2 className={styles.subHeading}>
              A styling package for easily adding themes to your React Native
              projects.
            </h2>
            <div className={`${styles.flex} ${styles.buttonsWrapper}`}>
              <div className={styles.flexItem}>
                <Link className={styles.button} to="/docs">
                  Get Started
                </Link>
              </div>
              <div className={styles.flexItem}>
                <button
                  className={styles.copyPaste}
                  onClick={() =>
                    navigator.clipboard.writeText("yarn add react-native-with-style")
                  }
                >
                  yarn add react-native-with-style
                  <CopySvg className={styles.copyIcon} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.phoneImageWrapper}>
            <img src={PhoneImage} style={{ maxHeight: 700 }} />
          </div>
        </section>
      </div>
    </header>
  );
}

function Home() {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}

export default Home;
