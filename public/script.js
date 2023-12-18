

let pkadastr = null;
let pnaxazi = null;
let pfartobi = null;
let pmisamarti = null;
let pstatusi = null;
let pzona = null;
let pk1 = null;
let pk2 = null;
let pk3 = null;
let pgancxadeba = null;
let pshezghudviszona = null;
let pmesakutreebi = null;
let pistoriuli = null;
let psakadastro_pdf = null;
let pamonaweri_pdf = null;
let pmerialink = null;
let maindiv = null;
let containerdiv = null;
let container2div = null;
let container3div = null;

//let loadingdiv = null;
let advertdiv = null;






document.addEventListener('DOMContentLoaded', function () {

    $(document).ready(function(){
        $("#search").focus(function() {
            $(".search-box").addClass("border-searching");
            $(".search-icon").addClass("si-rotate");
        });
    
        $("#search").blur(function() {
            $(".search-box").removeClass("border-searching");
            $(".search-icon").removeClass("si-rotate");
        });
    
        $("#search").keyup(function() {
            if ($(this).val().length > 0) {
                $(".go-icon").addClass("go-in");
            } else {
                $(".go-icon").removeClass("go-in");
            }
        });
    
        $('#search').on('keydown', function (e) {
            // Check if the pressed key is Enter (key code 13)
            if (e.which === 13) {
                // Prevent the default form submission
                e.preventDefault();
                // Trigger click event on the submit button
                $('#submit').click();
            }
        });
    
        $(".go-icon").click(function(){
            sendkadastr();
        });
    });
    // Function to update the DOM with the result data

    var cookiebtn = document.getElementById("cookie-close");
    var cookiediv = document.getElementById("cookiePolicy");
    
    cookiebtn.onclick = closeCookie;
    
    function closeCookie() {
      cookiediv.style.display = "none";
    }
    


    function open_pdf_sakadastro(result) {
        var linkToOpen = result.sakadastro_pdf;

        // Open a new tab with the specified link
        window.open(linkToOpen, '_blank');
    };

    function open_pdf_amonaweri(result) {
        var linkToOpen = result.amonaweri_pdf;

        // Open a new tab with the specified link
        window.open(linkToOpen, '_blank');
    };

    function open_meria(result) {
        var linkToOpen = `https://maps.tbilisi.gov.ge/#/C=${result.centroidx}-${result.centroidy}@Z=20`;

        // Open a new tab with the specified link
        window.open(linkToOpen, '_blank');
    };




    function getElements() {
        pkadastr = document.getElementById("row-01");
        pnaxazi = document.getElementById("row-02");
        pfartobi = document.getElementById("row-03");
        pmisamarti = document.getElementById("row-04");
        pstatusi = document.getElementById("row-05");
        pzona = document.getElementById("row-06");
        pk1 = document.getElementById("row-07");
        pk2 = document.getElementById("row-08");
        pk3 = document.getElementById("row-09");
        pgancxadeba = document.getElementById("row-010");
        pshezghudviszona = document.getElementById("row-011");
        pmesakutreebi = document.getElementById("row-012");
        pistoriuli = document.getElementById("row-013");
        psakadastro_pdf = document.getElementById("btn-sakadastro");
        pamonaweri_pdf = document.getElementById("btn-amonaweri");
        pmerialink = document.getElementById("btn-meria");
        maindiv = document.getElementById('maindiv');
        containerdiv = document.getElementById('info');
        container2div = document.getElementById('container2');
        container3div = document.getElementById('container3');
    };
    function updateDOM(result) {
        pkadastr.textContent = result.kadastrback;
        //pnaxazi.textContent = result.
        pfartobi.textContent = result.fartobi;
        pmisamarti.textContent = result.misamarti;
        pstatusi.textContent = result.nakveti;
        pzona.textContent = result.kveZona;
        pk1.textContent = result.k1;
        pk2.textContent = result.k2;
        pk3.textContent = result.k3;
        if (result.latest_ganxN === null) {
            pgancxadeba.textContent = "არა";
        } else {
            pgancxadeba.innerHTML = `ფიქსირდება განაცხადი (<a href="${result.nebartvislink}" target="_blank">${result.latest_ganxN}</a>)`;
        };
        
        if (result.kategoria === null) {
            pshezghudviszona.textContent = "არა";
        } else {
            pshezghudviszona.textContent = result.kategoria;
        };
        if (result.mesakutre === "სახელმწიფო") {
            pmesakutreebi.textContent = "კი";
        } else {
            pmesakutreebi.textContent = "არა";
        };
        if (result.dzegli === true) {
            pistoriuli.textContent = "კი";
        } else {
            pistoriuli.textContent = "არა";
        };

        if (result.sakadastro_pdf == null) {
            psakadastro_pdf.onclick = function() { alert("საკადასტრო რუკის დოკუმენტი არ მოიძებნა"); };
            psakadastro_pdf.style.display = "block";
        } else {
            psakadastro_pdf.onclick = function() { open_pdf_sakadastro(result); };
            psakadastro_pdf.style.display = "block";
        };
        
        if (result.amonaweri_pdf == null) {
            pamonaweri_pdf.onclick = function() { alert("ამონაწერის დოკუმენტი არ მოიძებნა"); };
            pamonaweri_pdf.style.display = "block";
        } else {
            pamonaweri_pdf.onclick = function() { open_pdf_amonaweri(result); };
            pamonaweri_pdf.style.display = "block";
        };
        pmerialink.onclick = function() { open_meria(result); };
        pmerialink.style.display = "";

        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f00';

        // Clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        // Find the bounding box of the coordinates
        var minX = Number.MAX_VALUE;
        var minY = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var maxY = Number.MIN_VALUE;

        result.transformed_coordinates.forEach(coord => {
            minX = Math.min(minX, coord[0]);
            minY = Math.min(minY, coord[1]);
            maxX = Math.max(maxX, coord[0]);
            maxY = Math.max(maxY, coord[1]);
        });

        // Calculate scale factors
        var scaleX = canvas.width / (maxX - minX);
        var scaleY = canvas.height / (maxY - minY);

        //console.log('minX:', minX);
        //console.log('minY:', minY);
        //console.log('maxX:', maxX);
        //console.log('maxY:', maxY);
        //console.log('scaleX:', scaleX);
        //console.log('scaleY:', scaleY);

        // Function to convert geographical coordinates to pixel coordinates
        function convertToPixel(coord) {
            var x = (coord[0] - minX) * scaleX;
            var y = canvas.height - (coord[1] - minY) * scaleY; // Flip the Y-axis
            return [x, y];
        }

        // Function to draw the polygon
        function drawPolygon(coordinates) {
            ctx.beginPath();

            // Move to the first coordinate
            var firstCoord = convertToPixel(coordinates[0]);
            ctx.moveTo(firstCoord[0], firstCoord[1]);

            // Draw lines to the subsequent coordinates
            for (var i = 1; i < coordinates.length; i++) {
                var coord = convertToPixel(coordinates[i]);
                ctx.lineTo(coord[0], coord[1]);
            }

            ctx.closePath();
            ctx.stroke();
        }

        // Draw the polygon using the provided coordinates
        drawPolygon(result.transformed_coordinates);
        

        containerdiv.classList.add("got-data");
        // Sleep for 1 second (1000 milliseconds)
        setTimeout(function () {
            maindiv.classList.add("got-data");
            container2div.classList.add("active");
            container3div.classList.add("active");
        }, 1000);

    };

    
    function sendkadastr () {
        closeCookie();
        const inputKadastr = document.getElementById('search').value;
        //console.log('clicked', inputKadastr);

        // Check conditions
        var dotsCount = (inputKadastr.match(/\./g) || []).length;
        var symbolsCount = inputKadastr.length;
        var lettersCount = inputKadastr.replace(/[^a-zA-Z]/g, "").length;
  
        if (dotsCount >= 3 && symbolsCount >= 9 && symbolsCount <= 25 && lettersCount <= 3) {
            // Valid input
            console.log('Input is valid');
            //loadingdiv = document.getElementById("loading");
            advertdiv = document.getElementById("dim");
            

            
            
            //loadingdiv.style.display = 'block';
            advertdiv.style.display = 'flex';
            // Prepare the data to be sent in the request body
            const data = {
                input_kadastr: inputKadastr
            };
            // Make a POST request to the Flask endpoint
            fetch('https://sakadastro-2wrl4gpsga-ew.a.run.app/api/getinformation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                //loadingdiv.style.display = 'none';
                advertdiv.style.display = 'none';
                console.log(result)
                // Check for the custom error code
                if (result.error === "ArasworiSakadastro") {
                    // Handle the custom error code
                    console.error("Custom error code received. Handle accordingly.");
                    swal(
                        'შეცდომა!',
                        'გთხოვთ გადაამოწმოთ საკადასტრო კოდი.',
                        'error'
                    )
                    // You can display an error message to the user or take other actions.
                } else {
                    getElements();
                    updateDOM(result);
                }
            })
            .catch(error => {
                //loadingdiv.style.display = 'none';
                advertdiv.style.display = 'none';
                swal(
                    'შეცდომა!',
                    'დაფიქსირდა ტექნიკური ხარვეზი. გთხოვთ სცადოთ მოგვიანებით.',
                    'error'
                )
            });
        } else {
          // Invalid input
          console.log('Input is invalid');
          let searchitem = document.getElementById("info");
          let borderofsearch = document.getElementById("border1");
          let borderofsearch2 = document.getElementById("border2");

          // Add the class
          searchitem.classList.add("false");
          borderofsearch.classList.add("false");
          borderofsearch2.classList.add("false");


                  
          // Remove the class after one second
          setTimeout(function() {
            searchitem.classList.remove("false");
            borderofsearch.classList.remove("false");
            borderofsearch2.classList.remove("false");
          }, 1000); // 1000 milliseconds = 1 second
        }
        
        
    };

});


