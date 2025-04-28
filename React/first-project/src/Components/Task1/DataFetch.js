import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function DataFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  const USERS_PER_PAGE = 5;

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const result = await response.json();

      let bigData = [];
      for (let i = 0; i < 100; i++) {
        bigData = bigData.concat(
          result.map((user) => ({
            ...user,
            id: user.id + i * result.length,
          }))
        );
      }

      bigData = bigData.sort(() => Math.random() - 0.5);

      setData(bigData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + USERS_PER_PAGE) % data.length);
      setProgress(0);
      setSlideDirection((prev) => (prev === "left" ? "right" : "left"));
    }, 5000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [data]);

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getSlideVariants = () => ({
    initial: { opacity: 0, x: slideDirection === "left" ? -100 : 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: slideDirection === "left" ? 100 : -100 },
  });

  const visibleData = data.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <div className="container py-4" style={{ overflow: "hidden" }}>
      <h2 className="text-center mb-5">Users Profile</h2>

      <div
        style={{
          position: "fixed",
          top: "65px",
          right: "10px",
          zIndex: 1000,
          background: "#fff",
          borderRadius: "50%",
          padding: "5px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <svg width="70" height="70">
          <circle
            cx="35"
            cy="35"
            r={radius}
            stroke="#eee"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="35"
            cy="35"
            r={radius}
            stroke="#36d7b7"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </svg>
      </div>

      <div
        className="d-flex flex-wrap justify-content-between gap-4"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <AnimatePresence mode="wait">
          {loading
            ? Array.from({ length: USERS_PER_PAGE }).map((_, index) => (
              <motion.div
                key={index}
                className="card shadow-sm text-center"
                style={{
                  width: "18%",
                  height: "320px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#f9f9f9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Skeleton circle={true} height={100} width={100} />
                <Skeleton height={20} width={100} className="my-2" />
                <Skeleton height={15} width={120} />
                <Skeleton height={15} width={90} />
              </motion.div>
            ))
            : visibleData.map((user) => (
              <motion.div
                key={user.id}
                initial={getSlideVariants().initial}
                animate={getSlideVariants().animate}
                exit={getSlideVariants().exit}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="card shadow-sm text-center"
                style={{
                  width: "18%",
                  height: "320px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#f9f9f9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`https://i.pravatar.cc/150?img=${(user.id % 70) + 1}`}
                  alt="User"
                  className="rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "3px solid #36d7b7",
                  }}
                />
                <h5 style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {user.name}
                </h5>
                <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                  {user.email}
                </p>
                <p className="text-muted" style={{ fontSize: "13px" }}>
                  {user.address.city}
                </p>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DataFetch;