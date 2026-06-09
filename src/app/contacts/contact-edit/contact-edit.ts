import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../contacts.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  imports: [FormsModule],
  templateUrl: './contact-edit.html',
  styleUrl: './contact-edit.css',
})
export class ContactEdit {
  originalContact: Contact | null = null;
  contact: Contact | null = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = '';
  
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        } 
        this.originalContact = this.contactService.getContact(this.id);
        if (!this.originalContact) return; 
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.groupContacts.values() != null) {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact));
        }
      }
    )
  }
  onSubmit(form: NgForm) {    
    const value = form.value
    const newContact = new Contact(this.id, value.name, value.email, value.phone, value.imageURL, [])
    if (this.editMode && this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addContact(newContact)
    } 
    this.router.navigate(['/contacts']);
  }
  onCancel() {
    this.router.navigate(['/contacts']);
  }
}
