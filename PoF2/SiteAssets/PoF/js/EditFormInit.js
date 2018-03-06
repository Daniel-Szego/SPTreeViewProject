

function EditFormViewModel() {
    this.PersonalNr = "00000";
    this.Name = ko.observable('Rambo');
    this.Vorname = ko.observable('John');
    this.Arbeitgeber = ko.observable('Damage INC');
    this.Kirchenkreis = ko.observable('no info');
    this.Beschaftigung = ko.observable('secret');
    this.Beruf = ko.observable('Killer');
    this.Adresse = ko.observable('Boston');
    this.Telefon = ko.observable('000-000-000');

    this.readonly = ko.observable();
    this.background = ko.observable('#FFFFFF');

    this.edit = function () {
        if (this.readonly == true) {
            this.readonly = false;
        }
        else
        {
            this.readonly = true;
        }
    };

    this.save = function () {
        alert("save");
    };

    this.cancel = function () {
        alert("cancel");
    };

}

ko.applyBindings(new EditFormViewModel());



