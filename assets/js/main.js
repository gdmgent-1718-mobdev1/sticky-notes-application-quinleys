function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.stickItApp(); // Test DbContext
            //this.stickyNoteApp();

        },
        "stickItApp": function () {
            let stickyNotes = this._applicationDbContext.getStickyNotes();
            var stickyNoteElement = document.querySelector('.stickynote');
            
            stickyNotes.forEach(function (element) {
                console.log(element);
                // let createdDate = formatDate(element.createdDate);
                // let modifiedDate = formatDate(element.modifiedDate);
                    stickyNoteElement.innerHTML +=
                        `
                        <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                                    <h5 class="card-title">${element.message}</h5>
                                    <ul class="list-group list-group-flush">
                                    <li class="list-group-item list-group-item-action">id: ${element.id}</li>
                                    <li class="list-group-item list-group-item-action">created: ${element.createdDate}</li>
                                    </ul>
                                
                                <form class="buttons">
                                <button class="deleteBtn btn btn-outline-danger btn-lg btn-block" id="${element.id}">Delete</button>
                                <button class="modifyNote btn btn-outline-info btn-lg btn-block" id="${element.id}" data="${element.message}">Modify</button>
                                
                            </form>
                            </div>
                        </div>
                        </div>
                    `;
                }, this);
                // Add Sticky Note
                // Get the Create button
            document.querySelector(".createStickyNote").addEventListener("click", function(){
                // get the value from the input
                let value = document.getElementById("createStickyNoteValue").value;
                // user if/else user needs to input something
                if ( value === null || value ===""){
                    alert("That didn't stick...");
                // Create a Sticky Note    
                } else {
                    let newSticky = new StickyNote();
                    newSticky.message = value;
                    ApplicationDbContext.addStickyNote(newSticky);
                    // console.log(value);
                }
                
            });
            // Delete Sticky Note
            // get the deletebutton out of the DOM
            var deleteSticky = document.querySelectorAll('.deleteBtn');
            // Loop through array
            for (var i = 0; i < deleteSticky.length; i++) {
                deleteSticky[i].addEventListener('click', function (event) {
                    var id = parseInt(this.id);
                    ApplicationDbContext.deleteStickyNoteById(id);
                });
            }
            var modifyNote = document.querySelectorAll('.modifyNote');
            for (var i = 0; i < modifyNote.length; i++) {
                modifyNote[i].addEventListener('click', function (event) {
                    
                         var message = prompt("", "Vul nieuwe tekst in");
                    
                        var id = parseInt(this.id);
                        sn = ApplicationDbContext.getStickyNoteById(id);
                        sn.message = message;
                        ApplicationDbContext.updateStickyNote(sn);
                    
                });
            }
        },
        
        /*
        "testApplicationDbContext": function() {
            // 1. Get all sticky notes
            let data = this._applicationDbContext.getStickyNotes();
            console.log(data);
            // 2. Create a new sticky note
            let sn = new StickyNote();
            sn.message = 'Pak cola zero voor mezelf.';
            sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it
            // 3. Get allesticky notes
            data = this._applicationDbContext.getStickyNotes();
            console.log(data);
            // 4. Get sticky note by id
            sn = this._applicationDbContext.getStickyNoteById(2306155430445);
            console.log(sn);
            // 5. Delete sticky note by id
            const deleted = this._applicationDbContext.deleteStickyNoteById(2306155430445);
            console.log(deleted);
            // 6. Soft Delete sticky note with id: 1551637732407
            //const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(1551637732407);
            //console.log(softDeleted);
            //sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            //console.log(sn);
            // 6. Soft Delete sticky note with id: 1551637732407
            const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(1551637732407);
            console.log(softUnDeleted);
            sn = this._applicationDbContext.getStickyNoteById(1551637732407);
            console.log(sn);
            // Update sticky note with id: 1902577181167
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log(sn);
            sn.message = 'ik heb zin in een zwarte kat (koffie)...';
            const updated = this._applicationDbContext.updateStickyNote(1902577181167);
            console.log(updated);
            sn = this._applicationDbContext.getStickyNoteById(1902577181167);
            console.log(sn);
        },*/
    };
    
    App.init(); // Initialize the application
    
});