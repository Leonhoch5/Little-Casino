document.addEventListener("DOMContentLoaded", () => {
  const door = document.getElementById("door");

  door.addEventListener("click", () => {
    console.log("Door clicked");
    // Open the door
    door.classList.toggle("open");

    // Wait for the door to open, then apply the zoom effect
    setTimeout(() => {
      document.querySelector(".casino-front").classList.add("zoom-effect");
    }, 1000); // Wait 1 second (duration of the door opening animation)

    // Redirect to room.html after the zoom animation completes
    setTimeout(() => {
      window.location.href = "room.html";
    }, 2500); // Wait 2.5 seconds (1s for door + 1.5s for zoom)
  });

});
