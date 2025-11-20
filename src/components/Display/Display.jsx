import React from 'react';
import ReusableButton from '../ReusableButton/ReusableButton';
import ReusableFormControl from '../ReusableFormControl/ReusableFormControl';
import { CgChevronRight } from 'react-icons/cg';
import { BiLike } from 'react-icons/bi';


const Display = () => {
    return (
        <div className='flex flex-col p-3'>
            <div className="buttons-block bg-gradient-to-r from-indigo-600 to-purple-600 py-1">
                <div className="bg-white py-1">
                    <h6 className='font-semibold text-center'>Buttons Variations</h6>
                </div>
            </div>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 py-2">
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
            <div className="buttons-block bg-gradient-to-r from-indigo-600 to-purple-600 py-1">
                <div className="bg-white py-1">
                    <h6 className='font-semibold text-center'>Form Controls</h6>
                </div>
            </div>
        </div>
    )
}

export default Display