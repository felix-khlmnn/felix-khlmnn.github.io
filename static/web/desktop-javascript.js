var navbar = document.getElementById("navbar");
            var navbarButton = document.getElementById("navbar-button");
            var slideState = true; //True means extended

            var listElHeight = document.getElementsByClassName("active")[0].offsetHeight;
            navbarButton.style.width = listElHeight + 1;
            navbarButton.style.height = listElHeight;
            navbarButton.style.setProperty("--translation", `${listElHeight - 0.5}px`);

            navbarButton.style.setProperty("--button-background-color", "#f1f1f1");

            function slideNavbar() {
                slideState = !slideState;
                if (slideState) {
                    navbar.classList.remove("not-extended");
                    navbarButton.style.setProperty("--button-background-color", "#f1f1f1");
                } else {
                    navbar.classList.add("not-extended");
                    navbarButton.style.setProperty("--button-background-color", "rgba(241, 241, 241, 0)");
                }

            }