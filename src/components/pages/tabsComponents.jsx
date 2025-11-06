
import React, { useState } from 'react';
import { FcHome } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';
import ComponentOne from '../ComponentOne';
import ComponentTwo from '../ComponentTwo';

// export Props related content
export const ParentProps = () => {
    return (
        <>
            <ChildProps
                name="W/O Destructuring"
                age={28}
                isLoggedIn={true}
                img="https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU="
                hobbies={['Reading', 'Traveling', 'Coding']}
                alt="User Image"
            />
        </>
    )
}

export const ChildProps = (props) => {
    return (
        <>
            <h4> Name : {props.name}</h4>
            <p> Age : {props.age}</p>
            <p> Status : {props.isLoggedIn}</p>
            <img src={props.img} alt={props.alt} width={100} />

        </>
    )
}

// Props with Destructuring
export const ParentPropsDestructring = () => {
    return (
        <>
            <ChildProps
                name="With Destructuring"
                age={28}
                isLoggedIn={true}
                img="https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU="
                hobbies={['Reading', 'Traveling', 'Coding']}
                alt="User Image"
            />
        </>
    )
}

export const ChildPropsDestructuring = ({ name, age, isLoggedIn, img, alt }) => {
    return (
        <>
            <h4> Name : {name}</h4>
            <p> Age : {age}</p>
            <p> Status : {isLoggedIn ? 'Online' : 'Offline'}</p>
            <img src={img} alt={alt} width={100} />
        </>
    )
}

// Person props from parent to child
export const PersonParentProps = () => {
    return (
        <>
            <PersonProps name="James" age={22} />
        </>
    )
}

export const PersonProps = (props) => {
    return (
        <>
            <h2>{props.name}</h2>
            <p>{props.age}</p>
        </>
    )
}

// Product Props from parent to child with Destructuring
export const ProductParentProps = () => {
    return (
        <>
            <ProductChildProps name="James Child" age={15} />
        </>
    )
}

export const ProductChildProps = ({ name, age }) => {
    return (
        <>
            <h2>{name}</h2>
            <p>{age}</p>
        </>
    )
}

// Card Component
export const CustomCard = ({
    title = "Reusable Components",
    description = "Create and reuse components like cards, modals and form controls.",
    image = "https://media.istockphoto.com/id/615422436/photo/demo-sign-cubes.jpg?s=612x612&w=0&k=20&c=HHOLIiF8SmbIssxKv3G480EgTVub_v9cc1QME3Dn6XU=",
    children }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-64 text-center hover:scale-105 transition-transform duration-300">
            {image && (
                <img src={image} title={title} className='w-full h-40 object-cover rounded-xl mb-3' />
            )}
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
            <p className='text-sm text-gray-500'>{description}</p>

            {/* {Extra JSX Passed from Parent} */}
            <div className='mt-3'>
                {children}
            </div>
        </div>
    )
}

export const CustomCardMap = ({ title, description, image, children }) => {
    return (
        <div className="w-full bg-white shadow-lg rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300">
            {image && (
                <img src={image} title={title} className='w-full h-40 object-cover rounded-xl mb-3' />
            )}
            <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
            <p className='text-sm text-gray-500'>{description}</p>

            {/* {Extra JSX Passed from Parent} */}
            <div className='mt-3'>
                {children}
            </div>
        </div>
    )
}

// Conditional Rendering Components
export const ValidPassword = () => { return (<h1>Valid Password</h1>) }
export const InvalidPassword = () => { return (<h1>InValid Password</h1>) }

export const Password = ({ isvalid }) => {
    if (isvalid) {
        return (
            <h1>Valid Password</h1>
        )
    }

    return (
        <h1> InValid Password</h1 >
    )
}

// Conditional Rendering with Ternary Operator
export const PasswordTernary = ({ isValid }) => {
    return (
        isValid ? <ValidPassword /> : <InvalidPassword />
    )
}

// Conditional Rendering With Cart
export const CartRender = () => {
    const items = ["Wireless Mouse", "Keyboard", "HDMI Cable"];
    return (
        <div>
            <h1> Cart 🛒 </h1>
            {items.length > 0 && <h2>You have {items.length} items in your cart.</h2>}

            <ul>
                <h3>Products</h3>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            {item}
                        </li>
                    )
                })}

            </ul>
        </div >

    )
}

// Exercise Conditional Rendering
export const ExerciseWeather = ({ temprature }) => {
    if (temprature < 15) {
        return <h1> It's Cold Outside ❄️ </h1>;
    }
    else if (temprature >= 15 && temprature <= 25) {
        return (
            <h1> It's Normal Weather 🌤️ </h1>
        )
    }
    else {
        return (
            <h1> It's Hot Outside 🔥 </h1>
        )
    }
}

// Exercise Weather with Ternary Operator
export const ExerciseWeatherTernary = ({ temprature }) => {
    return (
        (temprature < 15) ? <h1>`It's Cold Outside `</h1> :
            (temprature >= 15 && temprature <= 25) ? <h1>`It's Normal Weather `</h1> :
                <h1>`It's Hot Outside `</h1>
    )
}

// Conditonal rendering with checklist
export const ConditionalRenderingItem = ({ name, isPacked }) => {
    let itemContent = name;
    if (isPacked) {
        itemContent = name + '✅';
    }
    else {
        itemContent = name + '❌';
    }
    return (
        <>
            <ul>
                <li className='item'>
                    {itemContent}
                </li>
            </ul>
        </>
    )
}



//  Conditional Rendering Single Featured Product
export const FeaturedProduct = ({ name, price, image, inStock }) => {
    return (
        <div className="border p-4 rounded w-64">
            <img src={image} alt="image pic" className='w-full rounded h-40 object-cover mb-2' />
            <h2 className='text-xl font-bold'>{name}</h2>
            <p className='text-gray-700'>${price}</p>
            <p className={inStock ? 'text-green-500' : 'text-red-500'}>
                {inStock ? 'In Stock' : 'Out Stock'}
            </p>
        </div>
    )
}

// Conditional Rendering Multiple Products
export const MultipleProduct = ({ name, price, image, inStock }) => {
    return (
        <div className="border p-4 rounded w-full">
            <img src={image} alt="image pic" className='w-full rounded h-40 object-cover mb-2' />
            <h2 className='text-xl font-bold'>{name}</h2>
            <p className='text-gray-700'>${price}</p>
            <p className={inStock ? 'text-green-500' : 'text-red-500'}>
                {inStock ? 'In Stock' : 'Out Stock'}
            </p>
        </div>
    )
}

// Excercise UserStatus with the && Operator
export const UserStatus = ({ isLoggedIn, isAdmin }) => {
    return (
        (isLoggedIn && isAdmin) ? <h1>Welcome Admin</h1> : <h1>Welcome User</h1>
    )
}

// Excercise Morning Day Status
export const DayStatus = ({ timeOfDay }) => {
    return (
        (timeOfDay === 'morning') ? <h1>Good Morning!</h1> :
            (timeOfDay === 'afternoon') ? <h1>Good Afternoon!</h1> :
                (timeOfDay === 'evening') ? <h1>Good Evening!</h1> :
                    <h1>Good Night!</h1>
    )
}

// Inline Styles in React
export const InlineStyles = () => {
    const styles = { color: 'red', fontSize: '2rem', fontWeight: 'bold', backgroundColor: 'black', padding: '1rem', borderRadius: '0.5rem' }
    return (
        <div>
            <h6 className='mb-2'><strong>Styles with constant styles</strong></h6>
            <div style={styles}>Inline Styles</div>
            {/* OR */}
            <br />
            <h6 className='mb-2'><strong>Styles with inline styles</strong></h6>
            <div style={{
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
                backgroundColor: 'maroon',
                padding: '1rem',
                borderRadius: '0.5rem'
            }}> Inline Styles</div >
        </div>
    )
}

// React Icons in React
export const ReactIcons = () => {
    return (
        <h3 className='flex justify-center align-items-center p-2'> This is home Icon :  <FcHome /> </h3>
    )
}

// Exercise with Style Card

export const StyleCard = () => {
    return (
        <>

            <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px', color: 'white' }}>
                <h2 style={{ fontSize: '20px' }} >Inline Styled</h2 >
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ex repudiandae tempore tempora iste. Iure eum architecto dicta dolorem adipisci est quisquam, reiciendis dolorum voluptatum quos eaque minus, amet animi.</p>
            </div>
        </>
    )
}

export const ProfileCard = () => {
    const styles1 = { backgroundColor: 'lightblue', padding: '15px', borderRadius: '8px', color: 'black', marginTop: '20px' }
    return (
        <>
            <div style={styles1}>
                <h2 style={{ fontSize: '20px' }} >style by Object</h2 >
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ex repudiandae tempore tempora iste. Iure eum architecto dicta dolorem adipisci est quisquam, reiciendis dolorum voluptatum quos eaque minus, amet animi.</p>
            </div>
        </>
    )
}

// Events on Elements - Click
export const AddEvents = () => {
    const handleClick = () => {
        const showMessage1 = document.getElementById('message1');
        if (showMessage1) {
            showMessage1.textContent = 'Yes Button is Clicked';
        } else {
            showMessage1.textContent = '';
        }
        console.log(Math.round(Math.random() * 10));
    }
    return (
        <>
            <button className='cstm' onClick={handleClick}>Click</button>
            <p id='message1'></p>
        </>
    )
}

// Events on Elements - Copy
export const Copy = () => {
    const copyHandler = () => {
        return (
            console.log('Please stop copying my text')
        )
    }
    return (
        <div className="event-style">
            <p onCopy={copyHandler}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos consequuntur rerum officia non quae, placeat reiciendis inventore ducimus ullam quibusdam sunt aliquam unde magni laboriosam praesentium repudiandae similique amet alias!
            </p>
        </div>
    )
}

// Events on Elements - Select
export const Select = () => {
    const selectHandler = () => {
        const selection = window.getSelection().toString();
        const messageEl = document.getElementById('select-message');
        if (selection) {
            messageEl.innerHTML = `Your selected content is : <strong> ${selection}</strong>`;
        }
        else {
            messageEl.innerHTML = '';
        }
    }
    return (
        <div className="event-style">
            <p
                onMouseUp={selectHandler}
                onKeyUp={selectHandler}
                onSelect={selectHandler}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ad culpa distinctio ipsa cupiditate aliquam! Perferendis, nulla id eum, veniam commodi reiciendis laudantium facere tempore temporibus, maxime atque nesciunt qui!
            </p>
            <p className='showMessage' id='select-message'></p>
        </div >
    )
}

// Events on Elements - Move
export const Move = () => {
    const moveHandler = () => {
        const messageElement = document.getElementById('msg'); // 
        messageElement.textContent = 'Do not move mouse here!';
    }

    const leaveHandler = () => {
        const messageElement = document.getElementById('msg');
        messageElement.textContent = '';
    }
    return (
        <div className="event-style">
            <p
                onMouseMove={moveHandler}
                onMouseLeave={leaveHandler}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem facilis mollitia quibusdam quaerat pariatur iste, excepturi, provident ut distinctio corporis porro doloribus. Quibusdam quasi quae itaque, in vero distinctio dignissimos?
            </p>
            <p className='showMessage' id='msg' >

            </p>
        </div>
    )
}

// Use State
export const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div className='counter-card'>
            <h1>{count}</h1>
            <div className='flex gap-2 mt-2'>
                <button className='cstm' style={{ minWidth: '35px' }} onClick={decrement}>-</button>
                <button className='cstm' style={{ minWidth: '35px' }} onClick={increment}>+</button>
            </div>
        </div>
    )
}

// Array Content Use State
export const ArrayContent = () => {
    const [friends, setFriends] = useState(["Alex", "Bob"]);

    return (
        <>
            <h6 className='font-semibold'>Array Content Use State</h6>
            <ul>
                {friends.map((f) => (
                    <li key={f}>{f}</li>
                ))}
            </ul>
        </>
    )
}

// Array Content Add new Element
export const ArrayContentAddnewElement = () => {
    const [friends, setFriends] = useState(["Alex", "Bob"]);
    const addOneFriend = () => {
        if (!friends.includes("Foster")) {
            setFriends([...friends, "Foster"]);
        }
        else {
            toast.error('Name already exists');
        }
    }

    return (
        <>
            <Toaster position='top-right' reverseOrder={false} />
            <h6 className='font-semibold'>Array Content Add new Element</h6>
            <ul>
                {friends.map((f) => (
                    <li key={f}>{f}</li>
                ))}
            </ul>
            <button className='cstm m-1' onClick={addOneFriend}>Add One Friend</button>
            <br />
        </>
    )
}

// Array Content Remove One Element From the list
export const ArrayContentRemoveNewElement = () => {
    const [friends, setFriends] = useState(["Alex", "Bob", "Cherry"]);
    const addOneFriend = () => {
        if (!friends.includes("Dolby")) {
            setFriends([...friends, "Dolby"]);
        }
        else {
            toast.error('Name already exists');
        }
    }
    const removeOneFriend = () => setFriends(friends.filter((f) => f !== "Cherry"))
    return (
        <>
            <Toaster position='top-right' reverseOrder={false} />
            <h6 className='font-semibold'>Array Content Remove new Element</h6>
            <ul>
                {friends.map((f) => (
                    <li key={f}>{f}</li>
                ))}
            </ul>
            <button className='cstm m-1' onClick={addOneFriend}>Add One Friend</button>
            <button className='cstm m-1' onClick={removeOneFriend}>Remove One Friend</button>
        </>
    )
}

// Array Content Update Existing Element
export const ArrayContentExistingElement = () => {
    const [friends, setFriends] = useState(["Alex", "Bob", "Cherry", "Dobby", "Elixir"]);
    const addOneFriend = () => {
        if (!friends.includes("Foster")) {
            setFriends([...friends, "Foster"]);
        }
        else {
            toast.error('Name is already exist')
        }
    }
    const removeOneFriend = () => setFriends(friends.filter((f) => f !== "Cherry"));
    const updateExistingFriend = () => setFriends(friends.map((f) => (f == "Alex" ? 'Alex Smith' : f)));


    return (
        <>
            <Toaster position='top-right' reverseOrder={false} />
            <h1 className='font-semibold'>Array Content Update Existing Element</h1>
            <ul>
                {friends.map((f) => (
                    <li key={f}>{f}</li>
                ))}
            </ul>
            <button className='cstm m-1' onClick={addOneFriend}>Add One Friend</button>
            <button className='cstm m-1' onClick={removeOneFriend}>Remove One Friend</button>
            <button className='cstm m-1' onClick={updateExistingFriend}>Update Existing Friend</button>
        </>
    )
}

// Object Content Update with Use State
export const ObjectContent = () => {
    const [movie, setMovie] = useState(
        {
            title: 'Equalizer 3',
            ratings: 7,
        }
    );

    return (
        <>
            <h6 className='font-semibold'>Object Content </h6>
            <ul>
                <li>
                    <h1>Movie: <strong>{movie.title}</strong></h1>
                    <p>Rating: <strong>{movie.ratings}</strong></p>
                </li>
            </ul>
        </>
    )
}

// Object Content change rating with Use State
export const ObjectContentChangeRating = () => {
    const [movie, setMovie] = useState({
        title: 'Dreams',
        ratings: 6
    });

    // const updateRating = () => {
    //     const copyMovie = {
    //         ...movie,
    //         ratings: 5
    //     }
    //     setMovie(copyMovie);
    // }

    // or we can done like this
    const updateRating = () => setMovie({ ...movie, ratings: 2 });

    return (
        <>
            <h6 className='font-semibold'>Object Content change rating </h6>
            <ul>
                <li>
                    <h1>Movie: <strong>{movie.title}</strong></h1>
                    <p>Ratings: <strong>{movie.ratings}</strong></p>
                </li>
            </ul>
            <button className='cstm m-1' onClick={updateRating}>Update Ratings</button>
        </>
    )
}

// Array of Objects with Use State
export const ArrayOfObjects = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'SpiderMan',
            rating: 7
        },
        {
            id: 2,
            title: 'IronMan',
            rating: 8
        }
    ]);

    const handleClick = () => (setMovies(movies.map((m) => m.id == 1 ? { ...movies, title: 'John Wick' } : m)));

    return (
        <>
            <h6 className='font-semibold'>Array of Objects with Usestate</h6>
            <ul>
                {movies.map((m) => (
                    <li key={m.id}>{m.title}</li>
                ))}
            </ul>
            <button className='cstm m-1' onClick={handleClick}>Change Movie Name</button>
        </>
    )
}

// Share State to other Component
export const ShareStateToOther = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <h6 className='font-semibold'>Share State to other Component</h6>
            <ComponentOne count={count} onClickHandler={() => setCount(count + 1)} />
            <ComponentTwo count={count} onClickHandler={() => setCount(count + 1)} />
        </>
    )
}

// Form Controlled Components
export const FormControlled = () => {
    const [inputValue, setInputValue] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [color, setColor] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [passwordChange, setPasswordChange] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    // Confirm Password
    const [cPassword, setCPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Password Policy Checker (like websites require)
    const [password1, setPassword1] = useState('');


    // Input Type
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    // Textarea (Multiple lines)
    const handleChangeTextarea = (event) => {
        setTextareaValue(event.target.value);
    };

    // Select Dropdown
    const handleChangeDropdown = (event) => {
        setColor(event.target.value);
    }

    // Checkbox (Boolean values)
    const handleChangeChecked = (event) => {
        setIsChecked(event.target.checked);
    }

    // Password input
    const handleChangePassword = (event) => {
        setPasswordChange(event.target.value);
    }

    // Password Toggle 
    const toggleVisiblity = () => {
        setVisible(!visible);
    }

    // Password Strength Checker
    const hasUpperCase = /[A-Z]/.test(passwordStrength);
    const hasNumber = /[0-9]/.test(passwordStrength);
    const hasSpecialCase = /[^A-Za-z0-9]/.test(passwordStrength);
    const checkStrength = (passwordStrength) => {
        if (passwordStrength.length < 6) {
            return <span style={{ color: 'red' }}> Weak ❌</span>
        }

        if (hasUpperCase && hasNumber && hasSpecialCase) {
            return <span style={{ color: 'green' }}>Strong 💪</span>
        }
        else {
            return <span style={{ color: 'orange' }}>medium ⚡</span>
        }
    }

    // Confirm Password Validation
    const match = cPassword && confirmPassword && cPassword === confirmPassword;

    // Password Policy Checker (like websites require)
    const hasLength = (password1.length > 8);
    const hasUpperCase1 = /[A-Z]/.test(password1);
    const hasNumber1 = /[0-9]/.test(password1);
    const hasSpecialCase1 = /[^A-Za-z0-9]/.test(password1);


    return (
        <>
            <form >
                <div className="flex gap-5 flex-col">
                    <h6 className='font-semibold'>Input Type :</h6>
                    <div className='flex justify-between  items-center gap-5'>
                        <label htmlFor=""><input className='cstm-input' type="text" value={inputValue} onChange={handleChange} /></label>
                        <p className='flex-1'>input Value : {inputValue}</p>
                    </div>

                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'>Textarea (Multiple lines) :</h6>
                    <div className="flex justify-between  items-center gap-5">
                        <textarea className='cstm-input' value={textareaValue} onChange={handleChangeTextarea}></textarea>
                        <p className='flex-1'>Input Value : {textareaValue}</p>
                    </div>

                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'>Select Dropdown :</h6>
                    <div className="flex justify-between  items-center gap-5">
                        <select className='cstm-input' name="" id="" value={color} onChange={handleChangeDropdown}>
                            <option value="">Choose Color</option>
                            <option value="blue">Blue</option>
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                        </select>
                        <p className='flex-1'><span style={{ backgroundColor: color || 'transparent', padding: '5px', color: 'white' }}>Selected Color : {color}</span></p>
                    </div>

                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'>Checkbox (Boolean values) :</h6>
                    <div className='flex justify-between items-center gap-5'>
                        <label htmlFor="">Accept Terms : </label>
                        <input className='cstm-input' type="checkbox" checked={isChecked} onChange={handleChangeChecked} />
                        <p className='flex-1'>{isChecked ? 'Accepted ✅' : 'Not Accepted ❌'}</p>
                    </div>

                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'>Password input :</h6>
                    <div className="flex justify-between items-center gap-5">
                        <label htmlFor="">Please type password</label>
                        <input type="password" value={passwordChange} onChange={handleChangePassword} className='cstm-input' />
                        <p className='flex-1 flex flex-col'>
                            <span><strong className='font-semibold'>Password Length:</strong> {passwordChange.length} </span>
                            <span><strong className='font-semibold'>Password Text :</strong> {passwordChange}</span>
                        </p>
                    </div>

                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'> Password Toggle : </h6>
                    <div className="flex justify-between items-start gap-5 flex-col">
                        <label htmlFor="">Click on Button</label>
                        <input className='cstm-input' type={visible ? 'text' : 'password'} value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                        <button type='button' className='cstm' onClick={toggleVisiblity}> {visible ? '🔒 Hide' : '🔓Show'}</button>
                        <p> Password Visible : {password}</p>
                    </div>

                    {/* Password Strength Checker */}
                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'> Password Strength Checker : </h6>
                    <div className="flex justify-between items-start gap-5 flex-col">
                        <input type="password" className='cstm-input' value={passwordStrength} onChange={(e) => setPasswordStrength(e.target.value)} />
                        <p>Password Strength: {checkStrength(passwordStrength)} </p>
                        <p>Password Text : {passwordStrength}</p>
                    </div>

                    {/* Confirm Password */}
                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'> Confirm Password : </h6>
                    <div className="flex justify-between items-start gap-5 flex-col">
                        <span className='font-semibold mb-0'>Password : </span> <input className='cstm-input' type="text" value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
                        <span className='font-semibold mb-0'>Confirm Password</span><input className='cstm-input' type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <p>{confirmPassword ? match ? '✅ Passwords Match!' : '❌ Passwords do not match!' : ''}</p>
                    </div>

                    {/* Password Policy Checker (like websites require) */}
                    <hr className='border border-dashed' />
                    <h6 className='font-semibold'> Password Policy Checker : </h6>
                    <div className="flex justify-between items-start gap-5 flex-col">
                        <input className='cstm-input' type="text" value={password1} placeholder='Enter Password' onChange={(e) => setPassword1(e.target.value)} />
                        {hasLength && hasUpperCase1 && hasNumber1 && hasSpecialCase1 ? (
                            <p style={{ color: 'green', fontWeight: 'semi-bold' }}>✅ Your password is matched</p>)
                            : (
                                <ul>
                                    <li style={{ color: hasLength ? 'green' : 'red' }}>At least 8 characters</li>
                                    <li style={{ color: hasUpperCase1 ? 'green' : 'red' }}>At least 1 capital letter</li>
                                    <li style={{ color: hasNumber1 ? 'green' : 'red' }}>At least 1 number</li>
                                    <li style={{ color: hasSpecialCase1 ? 'green' : 'red' }}>At least 1 symbol</li>
                                </ul>
                            )}
                    </div>
                </div>
            </form>
        </>
    )
}

// Use state Examples
export const ExampleUseState = () => {
    const [usCount, setUsCount] = useState(0);
    const currentValue = () => setUsCount(usCount + 1)

    return (
        <>
            <p>{usCount}</p>

            <button className='cstm' onClick={currentValue}>usCount</button>
        </>
    )
}

// Use State with and Array
export const UsWithArray = () => {
    const [usArray, setUsArray] = useState([]);
    const addOneState = (e) => {
        e.preventDefault();
        if (!usArray.includes('State 1')) {
            setUsArray([...usArray, 'State 1'])
        }
    }

    return (
        <>
            <form>
                <ul>
                    {usArray.map((us, index) => (
                        <li key={index}>{us}</li>
                    ))}
                </ul>
                <button className='cstm' onClick={addOneState}>Add States</button>
            </form>
        </>
    )
}

// profile.jsx
export const UsProfile = () => {
    const [profileseth, setProfileseth] = useState({
        name: 'Heller',
        age: '20'
    })

    return (
        <>
            <p>Name : {profileseth.name}</p>
            <p>Age: {profileseth.age}</p>
        </>
    )
}

// Change Shopping list
export const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState(
        {
            name: 'Mouse',
            quantity: 3
        }
    )

    const changeList = () => setShoppingList({ ...shoppingList, quantity: 5 });

    return (
        <>
            <form >
                <ul>
                    <li>Name : {shoppingList.name}</li>
                    <li>Quantity: {shoppingList.quantity}</li>
                </ul>
            </form>
            <button onClick={changeList} className='cstm'>Change List</button>
        </>
    )
}