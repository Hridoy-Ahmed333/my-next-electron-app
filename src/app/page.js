"use client";
import { useStatistics } from "./hooks/useStat.js";
import styles from "./page.module.css";

export default function Home() {
  const statistics = useStatistics(20);
  console.log(statistics);
  console.log("Hello, World!");
  return (
    <div className={styles.page}>
      <h1>Hello, World!</h1>
    </div>
  );
}
