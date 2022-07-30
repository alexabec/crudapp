import {
    useGetContactsQuery,
    useUpdateContactMutation,
    useDeleteContactMutation,
    useAddContactMutation
} from "../api/ApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload, faPencil } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

const ContactList = () => {
    const [newContact, setNewContact] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContactsQuery()
    const [addContact] = useAddContactMutation()
    const [updateContact] = useUpdateContactMutation()
    const [deleteContact] = useDeleteContactMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact({ userId: 1, full_name: newContact, email: newEmail })
        setNewContact('')
        setNewEmail('')
    }

    const newItemSection =
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-contact">Enter a new contact</label>
            <div className="new-contact">
                <input
                    type="text"
                    id="new-contact"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="Enter full name"
                /><br></br>
                <input
                    type="text"
                    id="new-email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter email"
                />
            </div>
            <button className="submit"
                    disabled={!newContact || !newEmail}>
                <FontAwesomeIcon icon={faUpload} /> 
            </button>
        </form>


    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = contacts.map(contact => {
            return (
                <article key={contact.id}>
                    <div className="Contact">
                        <label htmlFor={contact.id}>{contact.full_name}<br>
                        </br>{contact.email}</label>
                    </div>
                    <button className="pen" 
                            onClick={() => updateContact({ ...contact, full_name: newContact, email: newEmail }, setNewContact(''), setNewEmail(''))}
                            disabled={!newContact || !newEmail}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="trash" 
                            onClick={() => deleteContact({ id: contact.id })}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Contact List</h1>
            {newItemSection}
            {content}
        </main>
    )
}
export default ContactList