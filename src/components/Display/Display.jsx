import React, { useState } from 'react';
import ReusableButton from '../ReusableButton/ReusableButton';
import { CgChevronRight } from 'react-icons/cg';
import { BiLike } from 'react-icons/bi';
import ReusableFormControl from '../ReusableFormControl/ReusableFormControl';
import ProfileForm from '../../pagesOut/ProfileForm';
import ButtonDemo from '../../pagesOut/ButtonDemo';
import ReusableModal from '../ReusableModal/ReusableModal';


const Display = () => {

    // Form control useStates....
    const [about, setAbout] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [lang, setLang] = useState("");
    const [checked, setChecked] = useState("");
    const [file, setFile] = useState("");
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [open5, setOpen5] = useState(false)


    return (
        <div className='flex flex-col p-3'>
            <div className="buttons-block bg-gradient-to-r from-indigo-600 to-purple-600 py-1">
                <div className="bg-white py-1">
                    <h6 className='font-semibold text-center'>Buttons Variations</h6>
                </div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 py-2 px-3">
                <div className="button-1">
                    <h6 className='font-semibold mb-1'>1. Primary Button</h6>
                    <ReusableButton>Click Me</ReusableButton>
                </div>
                <div className="button-2">
                    <h6 className='font-semibold mb-1'>2. Secondary Button</h6>
                    <ReusableButton variant="secondary" size="sm">
                        Small Button
                    </ReusableButton>
                </div>

                <div className="button-3">
                    <h6 className='font-semibold mb-1'>3. Full-Width Button</h6>
                    <ReusableButton full>Submit</ReusableButton>
                </div>

                <div className="button-4">
                    <h6 className='font-semibold mb-1'>4. Button with Loading State</h6>
                    <ReusableButton loading>Saving...</ReusableButton>
                </div>
                <div className="button-5">
                    <h6 className='font-semibold mb-1'>5. Button with Icons</h6>
                    <ReusableButton startIcon={<BiLike />} variant="success">
                        Like
                    </ReusableButton>
                </div>
                <div className="button-6">
                    <h6 className='font-semibold mb-1'>6. Button with Icons Other</h6>
                    <ReusableButton endIcon={<CgChevronRight />} variant="outline">
                        Next
                    </ReusableButton>
                </div>
                <div className="button-7">
                    <h6 className='font-semibold mb-1'>7. Submit Button</h6>
                    <ReusableButton type="submit">
                        Submit Form
                    </ReusableButton>
                </div>
                <div className="button-8">
                    <h6 className='font-semibold mb-1'>8. Custom Button</h6>
                    <ReusableButton className="shadow-lg">
                        With Shadow
                    </ReusableButton>
                </div>

                <div className="button-9">
                    <h6 className='font-semibold mb-1'>9. Loading State + Custom Text</h6>
                    <ReusableButton loading loadingText="Saving...">
                        Save
                    </ReusableButton>

                </div>

                <div className="button-10">
                    <h6 className='font-semibold mb-1'>10. Icon-Only Circular Button</h6>
                    <ReusableButton iconOnly>
                        <BiLike />
                    </ReusableButton>

                </div>

                <div className="button-11">
                    <h6 className='font-semibold mb-1'>11. Danger Button</h6>
                    <ReusableButton variant="danger">
                        Delete
                    </ReusableButton>
                </div>

                <div className="button-12">
                    <h6 className='font-semibold mb-1'>12. Ghost Button</h6>
                    <ReusableButton variant="ghost">Menu</ReusableButton>
                </div>
            </div>
            <br />
            <div className='button-13'>
                <h6 className='font-semibold mb-1'>RB :</h6>
                <ButtonDemo />

            </div>

            <br />
            <div className="buttons-block bg-gradient-to-r from-indigo-600 to-purple-600 py-1">
                <h6 className='font-semibold text-center bg-white py-1'>Form Controls</h6>
            </div>

            <br />
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 py-2 px-3 bg-white">

                {/* Textarea */}
                <ReusableFormControl
                    label="About You"
                    type='textarea'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder='Write something'
                />

                {/* Text */}
                <ReusableFormControl
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter your name'
                    helper='Minimum 3 Characters'
                    error={name.length > 0 && name.length <= 3 ? 'Too Short' : ''}
                    success={name.length >= 3}
                />

                {/* Select */}
                <ReusableFormControl
                    label="Select language"
                    type="select"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    options={[
                        { label: 'JavaScript', value: 'js' },
                        { label: 'Python', value: 'py' },
                    ]}
                />

                {/* Radio */}
                <ReusableFormControl
                    label="Select Gender"
                    type='radio'
                    name='gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    options={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' }
                    ]}
                />

                {/* Checkbox */}
                <ReusableFormControl
                    label='Check the item'
                    type='checkbox'
                    value={checked}
                    onChange={(e) => setChecked(e.target.value)}
                    placeholder='Accept Terms and Conditions'
                />

                {/* File Upload */}
                <ReusableFormControl
                    label='Upload files'
                    type='file'
                    onChange={(e) => setFile(e.target.value[0])}
                    placeholder='Upload File'
                />

                {/* Range */}
                <ReusableFormControl
                    label="Volume"
                    type="range"
                    value={50}
                    onChange={() => { }}
                />
            </div>
            <br />
            <div className="buttons-block bg-gradient-to-r from-indigo-600 to-purple-600 py-1">
                <h6 className='font-semibold text-center bg-white py-1'>Advanced Form Controls</h6>
            </div>
            <ul>

                <li>{`With this ONE COMPONENT

                    ✅ Login Form
                    ✅ Registration Form
                    ✅ Admin User Form
                    ✅ Product Add/Edit Form
                    ✅ Profile Form
                    ✅ KYC Form
                    ✅ Multi-Step Form
                    ✅ File Upload Form`}</li>
            </ul>
            <div>
                <ProfileForm />
            </div>

            <br />
            <div className="buttons-block bg-gradient-to-r from-indigo-600 to-purple-600 py-1">
                <h6 className='font-semibold text-center bg-white py-1'>Advanced Modals</h6>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 py-2 px-3 bg-white">

                {/* ✅ OPEN BUTTON */}
                <button className='cstm' onClick={() => setOpen1(true)}>
                    Open Modal
                </button>
                <ReusableModal
                    isOpen={open1}
                    onClose={() => setOpen1(false)}
                    title="Basic Modal"
                >
                    <p>This is a normal modal.</p>
                </ReusableModal>


                {/* Delete Modal */}
                <button className='cstm' onClick={() => setOpen2(true)}>Delete User</button>
                <ReusableModal
                    isOpen={open2}
                    onClose={() => setOpen2(false)}
                    title="Delete User"
                    footer={
                        <div className="flex justify-end gap-3">
                            <button className='cstm' onClick={() => setOpen2(false)}>Cancel</button>
                            <button className='cstm' onClick={() => setOpen2(false)}>Confirm</button>
                        </div>
                    }
                >
                    Are you sure you want to delete this user?
                </ReusableModal>

                {/* Form Modal */}
                <button className='cstm' onClick={() => setOpen3(true)}>Edit Profile</button>

                <ReusableModal
                    isOpen={open3}
                    onClose={() => setOpen3(false)}
                    title="Edit Profile"
                    size="lg"
                    footer={<button className='cstm' type="submit">Save</button>}
                >
                    <input className='cstm-input' placeholder="Name" />
                    <input className='cstm-input' placeholder="Email" />
                </ReusableModal>

                {/* Full Screen modal */}
                <button className='cstm' onClick={() => setOpen4(true)}>Open Fullscreen</button>

                <ReusableModal
                    isOpen={open4}
                    onClose={() => setOpen4(false)}
                    title="Fullscreen View"
                    size="full"
                >
                    <h1>Big Content Here</h1>
                </ReusableModal>

                {/* Loading Modal */}
                <button className='cstm' onClick={() => setOpen5(true)}>Start Saving</button>

                <ReusableModal
                    isOpen={open5}
                    onClose={() => setOpen5(false)}
                    title="Saving Data"
                    loading={true}
                >
                    Saving... Please wait
                </ReusableModal>


            </div>

        </div>

    )
}

export default Display