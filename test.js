values2 = ["1/2", "1/2", "1/2", "1/2", "1/2", "1/2", "2/1", "2/1", "2/1", "2/1", "2/1", "2/1"];
values3 = ["2X/2X", "2X/1.6X", "2X/1.6X", "1.6X/2X", "1.6X/2X", "2.4X/1.6X", "1.6X/2.4X", "2.4X/1.2X", "2.4X/1.2X", 
"1.2X/2.4X", "1.2X/2.4X", "2.8X/1.2X", "1.2X/2.8X", "2.8X/0.8X", "2.8X/0.8X", "0.8X/2.8X", "0.8X/2.8X", "1X/4X", "5X/1X", "6X/1X", "1X/30X", "40X/1X"];


values3 = ["2X/2X", "2X/1.6X", "2X/1.6X", "1.6X/2X", "1.6X/2X", "2.4X/1.6X", "1.6X/2.4X", "2.4X/1.2X", "2.4X/1.2X", 
"1.2X/2.4X", "1.2X/2.4X", "2.8X/1.2X", "1.2X/2.8X", "2.8X/0.8X", "2.8X/0.8X", "0.8X/2.8X", "0.8X/2.8X", "1X/4X", "5X/1X", "6X/1X", "1X/30X", "40X/1X"];


values3 = ["2X/1.2X/0.8X","2X/0.8X/1.2X","1.2X/0.8X/2X","1.2X/2X/0.8X","0.8/1.2X/2X","0.8X/2X/1.2X","1.6X/1.2X/0.8X","1.6X/1.2X/0.8X","1.6X/0.8X/1.2X",
"1.6X/0.8X/1.2X","1.2X/0.8X/1.6X","1.2X/0.8X/1.6X","1.2X/1.6X/0.8X","1.2X/1.6X/0.8X","0.8X/1.6X/1.2X","0.8X/1.6X/1.2X","0.8X/1.2X/1.6X","0.8X/1.2X/1.6X",
"2.4X/0.8X/0.8X","0.8X/2.4X/0.8X","0.8X/0.8X/2.4X","1X/1X/4X","1X/5X/1X","6X/1X/1X","1X/10X/1X","1X/1X/30X","40X/1X/1X"];
                   

var values1 = ["1/2","1/2","3/1","3/1","4/1","4/1","3/2","3/2","2/4","2/4","4/3","4/3","1/2/3","1/2/3","1/2/3","2/1/4","2/1/4","2/1/4","3/4/2","3/4/2","3/4/2","4/1/3","4/1/3","4/1/3"];
        

   1,7,13,21
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   // Initialize the rotation time
   var rotationTime = 20000;  // 30 seconds

   // After rotationTime, slow down the third wheel and print its result
   setTimeout(function () {
       
   rotationSpeeds[2] = 0.1;

   function rotationSpeed() {
       console.log(rotationSpeeds[2]); 
       rotationSpeeds[2] -= 0.001; // Decrease speed by a smaller amount for smoother transition

       if (rotationSpeeds[2] < 0) {
           rotationSpeeds[2] = 0; // Ensure speed doesn't go below 0
           clearInterval(rotationInterval); // Clear the interval to stop the function
       }
   }

   rotationSpeed();

   let rotationInterval = setInterval(rotationSpeed, 100);
       var sector = Math.floor((rotationAngles[2]) / (2 * Math.PI) * numSectors[2]) % numSectors[2];
       var forbiddenSectors = [0, 2];  // Replace with your own indices
       while (forbiddenSectors.includes(sector)) {
           // If the wheel landed on a forbidden section, increase the rotation angle
           // by a small fraction to make it land on the next section
           rotationAngles[2] += 2 * Math.PI / numSectors[2];  // Rotate to the next section
           sector = Math.floor((rotationAngles[2]) / (2 * Math.PI) * numSectors[2]) % numSectors[2];

           // Increase the rotation time by 5 seconds
           rotationTime += 5000;
       }
       var result = "Fast spin result for Wheel 3: Color: " + colors[2][(numSectors[2] - sector - 1) % numSectors[2]] + ", Value: " + values[2][(numSectors[2] - sector - 1) % numSectors[2]];
       console.log(result);
       var result = values[2][(numSectors[2] - sector - 1) % numSectors[2]];
       fillTableFromResult(result, 'myTable', 3);
       rotationSpeeds[2] = 0;
       // Display the result in the popup div and start the confetti
       var popupDiv = document.getElementById('popup');
       popupDiv.innerHTML = "<p>" + result + "</p>";
       popupDiv.style.display = 'block';
       confetti({ particleCount: 5000, spread: 160, target: 'popup' });  // Display more confetti in the popup div
       fillTableFromResult(result,'myTable', 4);
       // After 10 seconds, hide the popup div
       setTimeout(function () {
           popupDiv.classList.add('fadeOut');
           setTimeout(function () {
               popupDiv.style.display = 'none';
               popupDiv.classList.remove('fadeOut');
                   $.ajax({
                       url: 'save_to_database.php', // Your PHP file path
                       type: 'POST',
                       data: {
                           winningsArray: JSON.stringify(winningsArray) // The winnings array
                       },
                       success: function(response) {
                           // Handle the response from the PHP file
                           console.log(response);
                       },
                       error: function(jqXHR, textStatus, errorThrown) {
                           // Handle any errors
                           console.error("AJAX Error: " + textStatus + "; " + errorThrown);
                       },
                       complete: function(jqXHR, textStatus) {
                           // This callback function will always be called, regardless of success or failure
                           console.log("AJAX request completed with status: " + textStatus);
                       }
                   });

               rotationSpeeds = [0.01, 0.01, 0.01];
               let checkSession = setInterval(checkSessionStatus, 5000);
           }, 1000);
       }, 10000);
   }, rotationTime);

function popupfunction(result){
    var popupDiv = document.getElementById('popup');
    popupDiv.innerHTML = "<p>" + result2 + "</p>";
    popupDiv.style.display = 'block';
    confetti({ particleCount: 5000, spread: 100000, target: 'popup' });  // Display more confetti in the popup div
     // After 10 seconds, hide the popup div
     setTimeout(function () {
        // Play a sound effect
        popupDiv.classList.add('fadeOut');
        setTimeout(function () {
            popupDiv.style.display = 'none';
            popupDiv.classList.remove('fadeOut');
            let checkSession = setInterval(checkSessionStatus, 5000);

            // Stop the sound effect when the popup disappears
            a.pause();
            a.currentTime = 0;
        }, 1000);
    }, 10000);
}

     // Display the result in the popup div and start the confetti
   
     fillTableFromResult(result2, 'myTable2', 2);
     let a = new Audio('cheer.mp3'); // Replace 'soundfile.mp3' with the path to your sound file
     a.play();
    