var app = Vue.createApp({
    data() {
        return {
            title: 'mashoun',
            currentService: sessionStorage.getItem('currentService'),
            profile: '',
            content: ''
        }
    },
    methods: {
        copy() {
            navigator.clipboard.writeText(location.href);
        },
        dotmark(data, id) {
            //will return a string into html
            var parentTagName = "article";
            //   lines = this.tarjem(this.content, this.lang);
            var lines = data;
            console.log(lines);

            lines = lines.split("\n");
            var childTag = "p";
            var childClass = "text-start";
            var parentTag = document.createElement(parentTagName);

            lines.forEach((line) => {
                if (line == "") {
                    parentTag.appendChild(document.createElement("br"));
                    return;
                }

                if (line.includes("*")) {
                    if (line.includes(".......")) {
                        childTag = "h6";
                        line = line.replace(".......", "");
                    }
                    if (line.includes("......")) {
                        childTag = "h5";
                        line = line.replace("......", "");
                    }
                    if (line.includes(".....")) {
                        childTag = "h4";
                        line = line.replace(".....", "");
                    }
                    if (line.includes("....")) {
                        childTag = "h3";
                        line = line.replace("....", "");
                    }
                    if (line.includes("...")) {
                        childTag = "h2";
                        line = line.replace("...", "");
                    }
                    if (line.includes("..")) {
                        childTag = "h1";
                        line = line.replace("..", "");
                    }

                    line = line.replace("*", "");

                    var child = document.createElement(childTag);
                    var ul = document.createElement("ul");
                    var li = document.createElement("li");


                    if (line.includes("!!!")) {
                        childClass = "text-end";
                        line = line.replace("!!!", "");
                    }
                    if (line.includes("!!")) {
                        childClass = "text-center";
                        line = line.replace("!!", "");
                    }

                    // matching link
                    line = line.replace(
                        /(?<name>[^\s]+)::(?<url>[^\s]+)/gm,
                        '<a href="$2" >$1</a>'
                    );

                    // MATCHING HR LINE
                    line = line.replace(/__/, "<hr>");

                    // MATCHING DASH SPACE
                    line = line.replace(/---/gm, "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
                    line = line.replace(/--/gm, "&nbsp&nbsp");

                    child.classList.add(childClass);
                    // child.append(line)
                    child.innerHTML = line;

                    li.append(child);
                    ul.append(li);

                    parentTag.append(ul);
                    childClass = "text-justify";
                    childTag = "p";
                    return;
                }

                if (line.includes(".......")) {
                    childTag = "h6";
                    line = line.replace(".......", "");
                }
                if (line.includes("......")) {
                    childTag = "h5";
                    line = line.replace("......", "");
                }
                if (line.includes(".....")) {
                    childTag = "h4";
                    line = line.replace(".....", "");
                }
                if (line.includes("....")) {
                    childTag = "h3";
                    line = line.replace("....", "");
                }
                if (line.includes("...")) {
                    childTag = "h2";
                    line = line.replace("...", "");
                }
                if (line.includes("..")) {
                    childTag = "h1";
                    line = line.replace("..", "");
                }

                var child = document.createElement(childTag);


                if (line.includes("!!!")) {
                    childClass = "text-end";
                    line = line.replace("!!!", "");
                }
                if (line.includes("!!")) {
                    childClass = "text-center";
                    line = line.replace("!!", "");
                }

                // MATCHING SINGLE LINK
                line = line.replace(
                    /(?<name>[^\s]+)::(?<url>[^\s]+)/gm,
                    '<a href="$2" >$1</a>'
                );

                // MATCHING HR LINE
                line = line.replace(/__/, "<hr>");

                // MATCHING DASH SPACE
                line = line.replace(/---/gm, "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
                line = line.replace(/--/gm, "&nbsp&nbsp");

                child.classList.add(childClass);
                // child.append(line)
                child.innerHTML = line;
                parentTag.append(child);
                childClass = "text-justify";
                childTag = "p";
            });
            console.log(`<article>${parentTag.innerHTML}</article>`);
            document.getElementById(id).append(parentTag);
            // return parentTag
            return `<article>${parentTag.innerHTML}</article>`;
        },
    },
    mounted() {
        this.profile = JSON.parse(sessionStorage.getItem('profile'))
        this.content = this.profile.services.filter(s => {
            return s.title == this.currentService
        })[0].description

        this.dotmark(this.content, 'dotmark')
    }
})


app.component('navbar', {
    template:
        /*html */
        `
      <header class="pop  d-flex justify-content-between align-items-center shadow p-4">
        <section class="d-flex align-items-center gap-2">
          <i class="menu bi bi-grid-fill fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
          <a href="/"><img src="/assets/img/logo.png" alt="Jurdi Media" class="img-fluid" width="120" /></a>
        </section>
        <nav class="justify-content-evenly align-items-center gap-4">
          <a href="/Terms.html" class="lhv text-dark-x" >Terms of Use</a>
          <a href="/PrivacyPolicy.html" class="lhv text-dark-x" >Privacy Policy</a>
          <a href="#contact" class="lhv text-dark-x" >Contact</a>
          <a :href="linked" class="lhv text-dark-x" > LinkedIn </a>
          <a :href="'https://wa.me/'+whatsapp" class=" btn btn-success" >Whatsapp</a>
          
        </nav>
       
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <!-- <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5> -->
            <img src="/assets/img/logo.png" alt="Jurdi Media" class="img-fluid offcanvas-title" width="120" />
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p class="text-center fs-small text-secondary">MEDIA PRODUCTION CONSULTANTS LLC</p>
            <div class="ls-2 text-center d-flex justify-content-evenly align-items-center gap-3 flex-column">
                <a href="/Terms.html" class="w-100 shadow-sm p-2"><strong>Terms of Use</strong></a>
                <a href="/PrivacyPolicy.html" class="w-100 shadow-sm p-2"><strong>Privacy Policy</strong></a>
                <a href="#contact" class="w-100 shadow-sm p-2"><strong>Contact Us</strong></a>
                <a :href="linked" class="w-100 shadow-sm p-2"><strong>LinkedIn</strong></a>
                <a :href="'https://wa.me/'+whatsapp" class="w-100 btn btn-success ">Whatsapp</a>
                <slot></slot>
            </div>
        </div>
        </div>
      </header>
      `,
    props: ['webinar', 'whatsapp', 'linked']
})

app.component('hero', {
    template:
        /*html */
        `
      
      <section class="container mt-5">
          <h1 class="cin fs-1 text-dark-x px-2 " data-aos="zoom-in-up" data-aos-duration="1000">
            {{heading}}
          </h1>
          <p class="text-second-x fs-5 px-2 pop text-justify"  data-aos="fade-in" data-aos-duration="1000" data-aos-delay="100">
          {{bio}}
          </p>
      </section>
      `,
    props: ['heading', 'bio']
})

app.component('card', {
    template:
        /*html */
        `
      <section class="shadow card-section" data-aos="zoom-in-up" data-aos-duration="1000">
          <img :src="src" :alt="alt" class="w-100 h-100 cover img-grey">
          <div class="bg-glass w-100 p-3 ">
              <h3 class="pop fs-5 text-dark m-0"> <strong>{{text}}</strong> </h3>
          </div>
      </section>
      `,
    props: ['src', 'width', 'height', 'alt', 'text']
})

app.component('contact-section', {
    template:
        /*html */
        `
      
    <section id="contact" class="">
    <section class="container my-5">
      <h1 class="pop fs-1 text-dark-x px-2" data-aos="zoom-in-up" data-aos-duration="1000">
        <strong>Get In Touch !</strong>
      </h1>
      <p class="text-second-x fs-5 px-2 text-justify" data-aos="zoom-in" data-aos-duration="1500">
        If you have a project in mind, please complete the form below to send
        your Inquiry. We will contact you back at the earliest time possible.
      </p>
    </section>
    <section class="container my-5">
      <div class="row justify-content-between px-2">
  
        <!-- POTS -->
        <div class="col-lg-6 col-12 my-4" >
          <div class="row justify-content-center gap-3 mb-3">
            <!-- Call Us -->
            <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="100" class="pop p-4 shadow-sm col-12 col-md-5 d-flex flex-column gap-1 rounded">
                <i class="fs-3 bi bi-telephone-outbound-fill text-dark-x"></i>
                <strong class="fs-5 text-dark-x">Call Us</strong>
                <a :href="'https://wa.me/'+profile.number" class="fs-6 text-second-x  text-justify"> {{profile.number}} </a>
                <a :href="'https://wa.me/'+profile.number" class="w-100 btn btn-success"> <i class="bi bi-whatsapp"></i> Whatsapp</a>
            </div>
            <!-- Email Us -->
            <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="300" class="pop p-4 shadow-sm col-12 col-md-5 d-flex flex-column gap-1 rounded">
                <i class="fs-3 bi bi-envelope text-dark-x"></i>
                <strong class="fs-5 text-dark-x">Email Us</strong>
                <a href="" class="fs-6 text-second-x  text-justify"> {{profile.email}} </a>
                <!-- <button class="w-100 btn btn-success"> <i class="bi bi-whatsapp"></i> Whatsapp</button> -->
            </div>
          </div>
  
          <div class="row justify-content-center gap-3">
            
            <!-- Address Us -->
            <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="500" class="pop p-4 shadow-sm col-12 col-md-5 d-flex flex-column gap-1 rounded">
                <i class="fs-3 bi bi-geo-alt-fill text-dark-x"></i>
                <strong class="fs-5 text-dark-x">Address</strong>
                <a href="" class="fs-6 text-second-x  text-justify"> {{profile.address}} </a>
                <!-- <button class="w-100 btn btn-success"> <i class="bi bi-whatsapp"></i> Whatsapp</button> -->
            </div>
            <!-- Email Us -->
            <div data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="700" class="pop p-4 shadow-sm col-12 col-md-5 d-flex flex-column gap-1 rounded">
                <i class="fs-3 bi bi-clock text-dark-x"></i>
                <strong class="fs-5 text-dark-x">Open Hours</strong>
                <a href="" class="fs-6 text-second-x  text-justify">
                  <span> {{profile.openHours}} </span>
                </a>
                <!-- <button class="w-100 btn btn-success"> <i class="bi bi-whatsapp"></i> Whatsapp</button> -->
            </div>
          </div>
        </div>
  
       
        <!-- FORM -->
        <div class="col-lg-6 col-12 my-4">
         
          <section class="container">
          <section class="pop row gap-3">
              <b class="text-second-x ls-2 fs-5">CONTACT US</b>
              <input v-model="username" type="text" placeholder="Full Name" class="col-12 shadow-sm p-3" />
              <input v-model="useremail" type="email" placeholder="Email" class="col-12 shadow-sm p-3" />
              <input v-model="subject" type="text" placeholder="Subject" class="col-12 shadow-sm p-3" />
              <textarea
              v-model="message"
              placeholder="Type a message"
              class="col-12 shadow-sm p-3"
              ></textarea>
              <a :href="link" class="btn btn-primary col-6 mx-auto">Submit</a>
          </section>
          </section>
        </div>
      </div>
    </section>
  </section>
      `,
    props: ['profile'],
    data() {
        return {

            // send a message form

            message: '',
            subject: '',
            username: '',
            useremail: '',
        }
    },
    computed: {
        link() {
            return `mailto:${this.profile.email}?subject=${this.encode(this.subject)}&body=${this.encode('' + this.username + ' | ' + this.useremail + '\n\n\n' + this.message)}`
        }
    },
    methods: {

        encode(x) {
            return encodeURIComponent(x)
        },
    },
})


app.component('footer-section', {
    template:
        /*html */
        `
      <section>
        <hr class="w-75 mx-auto" />
        <h6
          style="user-select:none;"
          class="point text-second-x text-center pop my-3"
          @dblclick="navigateTo('/login')"
        >
          All Rights Reserved
        </h6>
        <!-- <img src="/logo.png" alt="Jurdi Media" width="150"> -->
      </section>
      `,
})

app.mount('#app')