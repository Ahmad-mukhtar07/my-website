document.addEventListener('DOMContentLoaded', function () {
    const greetings = [
      '• Hello •', '• ٱلسَّلَامُ عَلَيْكُمْ •', '• Ｃｉａｏ •',
      '• स्वागत हे •', '• 𝐻𝑜𝓁𝒶 •', '• S̄wạs̄dī •', '• 你好 •',
      '• Olá •', '• 𝐵𝑜𝓃𝒿𝑜𝓊𝓇 •'
    ];
  
    const loader = document.querySelector('.loader-container');
    const greetingElement = document.querySelector('.greeting');
    let currentIndex = 0;
  
    function showGreeting() {
      if (currentIndex < greetings.length) {
        greetingElement.textContent = greetings[currentIndex];
  
        let delay = 120; // Default delay
  
        if (currentIndex === 0) {
          delay = 1000; // Longer delay for the first greeting
          greetingElement.classList.add('fade-in'); // Add fade-in class to the first greeting
        } else if (currentIndex === greetings.length - 1) {
          greetingElement.classList.add('fade-out'); // Add fade-out class to the last greeting
          delay = 1000; // Longer delay for the last greeting
  
          setTimeout(function () {
            // Assuming 'loader' is your screen element
            loader.style.transition = 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)';

            // Adjust the translateY and rotate values as needed
            loader.style.transform = 'translateY(-100%) rotate(0deg)';

          }, delay);
        } else {
          greetingElement.classList.remove('fade-in', 'fade-out'); // Remove any fade classes
        }
  
        setTimeout(function () {
          currentIndex++;
          showGreeting();
        }, delay);

        setTimeout(function () {
            loader.style.borderRadius = "0 0 240px 50%/60px;";
            // loader.style.borderRadius = "0 0 25px 25px"; // Slightly curved
            loader.style.animation = "fade-in 3s ease forwards"; // Adjust transition duration as needed
          }, 2900); 
      }
    }
  
    setTimeout(function () {
      showGreeting();
    }, 1300); // Show greetings a little earlier
  });
  