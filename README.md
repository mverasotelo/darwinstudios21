#Darwin Studios

My capstone for Harvard CS50 is a website for a recording studio, event room, office space and private studios in the City of Buenos Aires.

####Distinctiveness and Complexity:

The website is fully responsive and allows users to view multimedia information about available venues and previous productions, to filter productions by venue and send a contact form.

The project implements what was learned in the course regarding HTML, CSS, JavaScript, Django, the creation and use of models and one-to-many relationships, as well as Django Admin.

The back end incorporates the use of a contact form created directly from Django using ModelForm and E-mail sending when submitting the form using EmailMultiAlternatives.

On the other hand, the front end incorporates animations, media-queries and the use of a framework (Vue.js) using its Content Delivery Network, which allows creating dynamic components (e.g. service-card).

- Scripts.js: Includes Vanilla JS for changing the header on scroll.

- Vue.js: Includes Java Script code using the Vue.js framework. This file is used to incorporate a loader, handle events and display pop-up windows, which contain a carousel of multimedia content and information dynamically loaded by accessing the database with fetch requests.

- Styles.css: Includes the style of the page, using keyframes and mediaqueries.

- Models.py: Includes 5 models.

- Forms.py: Includes one contact form, created from the Contact model fields. 

- Views.py: Includes the views, making use of EmailMultiAlternatives for sending the contact form via E-mail, and using json module in order to serialize python objects to JSON.

- Admin.py: Includes customization of Django´s admin interface.
