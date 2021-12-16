import React from 'react';
import styles from './styles.module.css';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerLeft}>
        Copyright © {new Date().getFullYear()}{' '}
        <a rel="author" href="https://twitter.com/ahmetkuslular" target="_blank">
          Ahmet Kuşlular
        </a>
      </div>
      <div className={styles.footerRight}>
        Built with{' '}
        <a rel="nofollow" href="https://v2.docusaurus.io/" target="_blank">
          Docusaurus
        </a>{' '}
        ❤️
      </div>
    </footer>
  );
}

export default Footer;
