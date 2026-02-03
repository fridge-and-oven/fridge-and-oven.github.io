function addNavTool(){
    var div = document.getElementById("navtool");
    div.innerHTML=`
    <div class="container-fluid bg-nav sticky-top p-0">
            <nav class="navbar navbar-expand-lg navbar-light p-0" id="menu">
                <a href="index.html" class="navbar-brand bg-primary py-4 px-5 me-0">
                    <h1 class="mb-0"><i class="bi bi-cookie"></i>FRIDGE AND OVEN</h1>
                </a>
                <button
                    type="button"
                    class="navbar-toggler me-4"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse p-3" id="navbarCollapse">
                    <div class="navbar-nav mx-auto">
                        <ul>
                            <li><a href="index.html" class="nav-item nav-link active">Home</a></li>
                            <li><a href="about.html" class="nav-item nav-link">About</a></li>
                            <li><a href="service.html" class="nav-item nav-link">How to Order</a></li>
                            <li>
                                <div class="nav-item dropdown">
                                    
                                    <label for="menu-toggle" class="nav-link">Menu ▾</label>
                                    <input type="checkbox" id="menu-toggle" />

                                    <ul class="submenu">
                                        <li>
                                            <label for="nested-toggle" class="dropdown-item nav-link" style="font-size: small">Whole cake ▾</label>
                                            <input type="checkbox" id="nested-toggle" />

                                            <ul class="nested-submenu nav-item">
                                                <li><a href="our-cakes.html" class="dropdown-item nav-link" style="font-size:x-small">all cakes</a>
                                                </li>
                                                <li><a href="#" class="dropdown-item nav-link" style="font-size: x-small">nuts</a></li>
                                                <li><a href="#" class="dropdown-item nav-link" style="font-size:x-small">fruits</a></li>
                                                <li><a href="#" class="dropdown-item nav-link" style="font-size: x-small">chocolate</a></li><li><a href="#" class="dropdown-item nav-link" style="font-size:x-small">tea</a></li>
                                                <li><a href="#" class="dropdown-item nav-link" style="font-size: x-small">tart and pie</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="sliced-cakes.html" class="dropdown-item nav-link" style="font-size: small">sliced cakes</a></li>
                                        <li>
                                            <label for="nested-toggle2" class="dropdown-item nav-link" style="font-size: small">cookies ▾</label>
                                            <input type="checkbox" id="nested-toggle2" />

                                            <ul class="nested-submenu2">
                                                <li><a href="#" class="dropdown-item nav-link" style="font-size:x-small">soft baked</a></li>
                                                <li><a href="#" class="dropdown-item nav-link" style="font-size: x-small">sables</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <div class="nav-item dropdown">
                                    
                                    <label for="menu-toggle2" class="nav-link">workshops ▾</label>
                                    <input type="checkbox" id="menu-toggle2" />

                                    <ul class="submenu2">
                                        <li><a href="#" class="dropdown-item nav-link" style="font-size: small">monthly schedule</a></li>
                                        <li><a href="#" class="dropdown-item nav-link" style="font-size: small">private class</a></li>
                                        <li><a href="#" class="dropdown-item nav-link" style="font-size: small">class menu</a></li>
                                        <li><a href="#" class="dropdown-item nav-link" style="font-size: small">gallery</a></li>
                                        
                                    </ul>
                                </div>
                            </li>
                            <li><a href="contact.html" class="nav-item nav-link">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    `;
   
    
}