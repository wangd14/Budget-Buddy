import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Save Time',
    imgSrc: '/images/images.jpg',
    description: (
      <>
        Budget Buddy is the best application.
      </>
    ),
  },
  {
    title: 'Save Money',
    imgSrc: '/images/05c.jpg',
    description: (
      <>
        Budget.
      </>
    ),
  },
  {
    title: 'Beat it Chick',
    imgSrc: '/images/35c.jpg',
    description: (
      <>
        Budget.
      </>
    ),
  },
];

function Feature({ imgSrc, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
     
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}