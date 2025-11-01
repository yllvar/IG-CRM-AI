async function loadAnalytics() {
  try {
    const res = await fetch("https://chatbot-instagram-analytics.onrender.com/api/analytics/data");
    const data = await res.json();

    const { followerGrowth, engagement, bestPostTime } = data;
console.log("Analytics data:", data);
console.log("Fetched analytics data:", data);
   
    // Follower Growth Chart
    new Chart(document.getElementById("followersChart"), {
  type: "line",
  data: {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [{
      label: "Followers",
      data: followerGrowth,
      borderColor: "#3e95cd",
      fill: false
    }]
  }
}); 

    // Engagement Chart
    new Chart(document.getElementById("engagementChart"), {
      type: "bar",
      data: {
        labels: engagement.map((_, i) => `Post ${i + 1}`), 
        datasets: [
          {
            label: "Likes",
            data: engagement.map((e) => e.likes),
            backgroundColor: "#42a5f5"
          },
          {
            label: "Comments",
            data: engagement.map((e) => e.comments),
            backgroundColor: "#66bb6a"
          }
        ]
      }
    });

    // Best Time to Post
   document.getElementById("best-time").textContent = bestPostTime || "Loading...";


  } catch (err) {
    console.error("Failed to load analytics", err);
  }
}

function downloadCSV() {
  const token = localStorage.getItem("token"); // from storage
  if (!token) return alert("Not logged in!");

  fetch("https://chatbot-instagram-analytics.onrender.com/api/analytics/export", {

    headers: {
      Authorization: `Bearer ${token}`
    }
  })    
    .then((res) => {
      if (!res.ok) throw new Error("Export failed");
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "analytics.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => {
      console.error("Download failed", err);
      alert("CSV download failed.");
    });
}

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadAnalytics();
  document.getElementById("download-csv").addEventListener("click", downloadCSV);
});
