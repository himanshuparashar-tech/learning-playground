import React from 'react';
import {
    ParentProps,
    ParentPropsDestructring,
    PersonParentProps,
    ProductParentProps,
    CustomCard,
    CustomCardMap,
    Password,
    PasswordTernary,
    CartRender,
    ExerciseWeather,
    ExerciseWeatherTernary,
    UserStatus,
    DayStatus,
    InlineStyles,
    ReactIcons,
    StyleCard,
    ProfileCard,
    AddEvents,
    Copy,
    Move,
    Select,
    Counter,
    ArrayContent,
    ArrayContentAddnewElement,
    ArrayContentRemoveNewElement,
    ArrayContentExistingElement,
    ObjectContent,
    ObjectContentChangeRating,
    ArrayOfObjects,
    ShareStateToOther,
    ConditionalRenderingItem,
    FeaturedProduct,
    MultipleProduct,
    FormControlled,
    ExampleUseState,
    UsWithArray,
    UsProfile,
    ShoppingList
} from './tabsComponents';
import ExampleOne from '../ExampleOne';
import ExampleTwo from '../ExampleTwo';
import ExampleThree from '../ExampleThree';
import { ArrayData } from './ArrayData';

export function getTabs() {

    return [
        {
            id: 1,
            name: 'Welcome Message',
            type: 'codePreview',
            code: `const WelcomeMessage = () => {
                return (
                    <div>
                    <h1 className='text-xl'>Hello World</h1>
                    <p>Welcome To Learning Jsx</p>
                    </div>
                )
                }
                export default WelcomeMessage;`,
            preview: <div>
                <h1 className='text-xl'>Hello World</h1>
                <p>Welcome To Learning Jsx</p>
            </div>
        },
        {
            id: 2,
            name: 'JSX Rules',
            type: 'codePreview',
            code: `const JsxRules = () => {
                return (
                    <>
                    <h1>JsxRules</h1>
                    <ul>
                        <li><p>JSX must return a single parent element</p></li>
                        <li><p>JSX elements must be properly closed</p></li>
                        <li><p>JSX attributes are written using camel case example ClassName instead of Class or HtmlFor instead of For</p></li>
                    </ul>
                    </>
                )
                }
                export default JsxRules;`,
            preview: <div className='space-y-2'>
                <h1>JsxRules</h1>
                <ul>
                    <li><p>JSX must return a single parent element</p></li>
                    <li><p>JSX elements must be properly closed</p></li>
                    <li><p>JSX attributes are written using camel case example ClassName instead of Class or HtmlFor instead of For</p></li>
                </ul>
            </div>
        },
        {
            id: 3,
            name: 'Lists',
            type: 'codePreview',
            code: `function ExampleList() {
                return (
                    <ul>
                    <li>Item A</li>
                    <li>Item B</li>
                    <li>Item C</li>
                    </ul>
                );
                }
                export default ExampleList;`,
            preview: <div className='space-y-2'>
                <ul className='list-disc pl-5'>
                    <li>Item A</li>
                    <li>Item B</li>
                    <li>Item C</li>
                </ul>
                <div className='text-sm text-gray-500'>This is a live preview of the list component.</div>
            </div>
        },
        {
            id: 4,
            name: 'Type of Date',
            type: 'codePreview',
            code: `const Greet = () => {
                const greetMessage = 'Hello, Welcome to World of R';
                const currentDateTime = new Date().toLocaleString();
                const currentDateInString = new Date().toDateString();
                const currentDateInNumber = new Date().toLocaleDateString();
                return (
                    <>
                    <h4>{greetMessage}</h4>
                    <p>{currentDateTime}</p>
                    <p>{currentDateInString}</p>
                    <p>{currentDateInNumber}</p>
                    </>
                )
                }
                export default Greet;`,
            preview: <div className='space-y-1'>
                <h4 className='font-medium'>{ArrayData.greetMessage}</h4>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{ArrayData.currentDateTime}</p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{ArrayData.currentDateInString}</p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{ArrayData.currentDateInNumber}</p>
            </div>
        },
        {
            id: 5,
            name: 'Map Method',
            type: 'codePreview',
            code: `const Map = () => {
                    return (
                        <>
                            {mapArray.map((number) => (
                                <ul key={number}>
                                    <li>{number}</li>
                                </ul>
                            ))}
                        </>
                    )
                }
                export default Map`,
            preview: <div>
                {ArrayData.mapArray.map((number) => (
                    <ul key={number}>
                        <li>{number}</li>
                    </ul>
                ))}
            </div>
        },
        {
            id: 6,
            name: 'Map Example',
            type: 'codePreview',
            code: `const MapExample = () => {
                const userInfo = [
                    {
                        username: 'Alice',
                        email: 'alice@example.com',
                        age: 28,
                    },
                    {
                        username: 'Bob',
                        email: 'bob@example.com',
                        age: 34,
                    },
                    {
                        username: 'Charlie',
                        email: 'charlie@example.com',
                        age: 25,
                    },
                ];
                return (
                    <div>
                        {
                            userInfo.map(({username, email, age}, idx) => (
                                <ul key={idx}>
                                    <li>{username}</li>
                                    <li>{email}</li>
                                    <li>{age}</li>
                                </ul>
                            ))
                        }
                    </div>
                )
            }
            export default MapExample`,
            preview:
                <div>
                    {
                        ArrayData.userInfo.map(({ username, email, age }, idx) => (
                            <ul key={idx}>
                                <li>{username}</li>
                                <li>{email}</li>
                                <li>{age}</li>
                            </ul>
                        ))
                    }
                </div>
        },
        {
            id: 7,
            name: 'ForEach & Map',
            type: 'codePreview',
            code: `const MethodComparisonTable = () => {
                const data = [
                    {
                    section: '🧠 Purpose',
                    rows: [
                        {
                        method: 'forEach()',
                        description: 'Used to loop through an array and perform an action for each element.',
                        },
                        {
                        method: 'map()',
                        description: 'Used to loop through an array and create a new array by transforming each element.',
                        },
                    ],
                    },
                    {
                    section: '💻 Return Value',
                    rows: [
                        { method: 'forEach()', description: 'Nothing (undefined)' },
                        { method: 'map()', description: 'A new array with modified values' },
                    ],
                    },
                ];

                return (
                    <div style={{ margin: '20px', fontFamily: 'sans-serif' }}>
                    {data.map(({ section, rows }) => (
                        <div key={section} style={{ marginBottom: '30px' }}>
                        <h3>{section}</h3>
                        <table
                            border="1"
                            cellPadding="10"
                            cellSpacing="0"
                            style={{
                            borderCollapse: 'collapse',
                            width: '100%',
                            textAlign: 'left',
                            backgroundColor: '#f9fafb',
                            }}
                        >
                            <thead style={{ backgroundColor: '#e5e7eb' }}>
                            <tr>
                                <th>Method</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map(({ method, description }) => (
                                <tr key={method}>
                                <td style={{ fontWeight: 'bold' }}>{method}</td>
                                <td>{description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    ))}
                    </div>
                );
                };

                export default MethodComparisonTable;`,
            preview:
                <div style={{ margin: '20px', fontFamily: 'sans-serif' }}>
                    {ArrayData.data.map(({ section, rows }) => (
                        <div key={section} style={{ marginBottom: '30px' }}>
                            <h3>{section}</h3>
                            <table
                                border="1"
                                cellPadding="10"
                                cellSpacing="0"
                                style={{
                                    borderCollapse: 'collapse',
                                    width: '100%',
                                    textAlign: 'left',
                                    backgroundColor: '#f9fafb',
                                }}
                            >
                                <thead style={{ backgroundColor: '#e5e7eb' }}>
                                    <tr>
                                        <th>Method</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map(({ method, description }) => (
                                        <tr key={method}>
                                            <td style={{ fontWeight: 'bold' }}>{method}</td>
                                            <td>{description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
        },
        {
            id: 9,
            name: 'Mapping with destructure',
            type: 'codePreview',
            code: `const destructureArrayMethod = () => {
                    return (
                        <>
                            {
                                Users.map(({id, name, age}) => (
                                    <ul key={id}>
                                        <li>{name}</li>
                                        <li>{age}</li>
                                    </ul>
                                ))
                            }
                        </>
                    )
                }
                export default destructureArrayMethod;`,
            preview:
                <div>
                    {
                        ArrayData.destructureArray.map(({ id, name, age }) => (
                            <ul key={id}>
                                <li>{name}</li>
                                <li>{age}</li>
                            </ul>
                        ))
                    }
                </div>
        },
        {
            id: 10,
            name: 'Props',
            type: 'codePreview',
            code: `const ParentProps = () => {
                return (
                    <ChildProps 
                        name="James" 
                        age={30}
                        email="james@learn.com"
                    />
                )}

                const ChildProps = (props) => {
                     return (
                        <>
                            <h4> Name : {props.name}</h4>
                            <p> Age : {props.age}</p>
                            <p> Status : {props.isLoggedIn}</p>
                            <img src={props.img} alt={props.alt} width={100} />
                
                        </>
                    )
                }
                export default ParentProps;`,
            preview:
                <div>
                    <ParentProps />
                    <br />
                    <br />
                    <h6><strong>Note:</strong></h6>
                    <ul>
                        <li>
                            <p>Props/Properties are arguments passed into React components</p>
                        </li>
                        <li>
                            <p>Props let us pass data from a parent component to a child component</p>
                        </li>
                        <li>
                            <p>Props are passed to components via HTML attributes</p>
                        </li>
                    </ul>
                </div>
        },
        {
            id: 11,
            name: 'Props with Destructuring',
            type: 'codePreview',
            code: `const ParentPropsDestructring = () => {
                    return (
                        <>
                            <ChildPropsDestructuring
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
                const ChildPropsDestructuring = ({ name, age, isLoggedIn, img, alt }) => {
                    return (
                        <>
                            <h4> Name : {name}</h4>
                            <p> Age : {age}</p>
                            <p> Status : {isLoggedIn ? 'Online' : 'Offline'}</p>
                            <img src={img} alt={alt} width={100} />
                        </>
                    )
                }`,
            preview:
                <div>
                    <ParentPropsDestructring />
                </div>
        },
        {
            id: 12,
            name: 'Ex: Using Props in React Components',
            type: 'codePreview',
            code: `// Person props from parent to child
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
            <ul>
                <li>
                    
                </li>
            </ul>`,
            preview:
                <div>
                    <PersonParentProps />
                    <br />
                    <br />
                    <h6><strong>Note:</strong></h6>
                    <ul>
                        <li>
                            Think of it like this:
                        </li>
                        <li>
                            The Parent (PersonParentProps) is the one who gives gifts (props).
                        </li>
                        <li>
                            The Child (PersonProps) only shows the gifts it receives.
                        </li>
                        <li>
                            If you render just the child, it has no gifts to display 😅
                        </li>
                        <li>
                            If you render the parent, it automatically gives and displays them 🎁
                        </li>
                    </ul>
                </div>
        },
        {
            id: 13,
            name: 'Ex: Using Props With Destructuring',
            type: 'codePreview',
            code: `
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
            }`,
            preview:
                <div>
                    <ProductParentProps />
                </div>
        },
        {
            id: 14,
            name: 'Reusable Card Component with default Props',
            type: 'codePreview',
            code: `const CustomCard = ({
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
                }`,
            preview:
                <CustomCard />
        },
        {
            id: 15,
            name: 'Reusable Card Component with Mapping',
            type: 'codePreview',
            code:
                `export const CustomCardMap = ({ title, description, image, children }) => {
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
                    
                // With Slice 

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
                    {cards.slice(0, 3).map((card, idx) => (
                        <CustomCardMap
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                        >
                            <ul className="text-left list-disc pl-5 mt-2">
                                {card.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </CustomCardMap>
                    )
                    )}
                </div>
                
                `,
            preview:
                <div className='overflow-auto' style={{ maxHeight: 'calc(100vh - 275px)' }}>
                    <div className="flex justify-between gap-6 w-full">
                        <CustomCardMap
                            className="sm:w-1/3 w-full"
                            title={ArrayData.cards[0].title}
                            description={ArrayData.cards[0].description}
                            image={ArrayData.cards[0].image}
                        >
                            <ul className="text-left list-disc pl-5 mt-2">
                                {ArrayData.cards[0].features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </CustomCardMap>
                        <CustomCardMap
                            className="sm:w-1/3 w-full"
                            title={ArrayData.cards[1].title}
                            description={ArrayData.cards[1].description}
                            image={ArrayData.cards[1].image}
                        >
                            <ul className="text-left list-disc pl-5 mt-2">
                                {ArrayData.cards[1].features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </CustomCardMap>
                        <CustomCardMap
                            className="sm:w-1/3 w-full"
                            title={ArrayData.cards[2].title}
                            description={ArrayData.cards[2].description}
                            image={ArrayData.cards[2].image}
                        >
                            <ul className="text-left list-disc pl-5 mt-2">
                                {ArrayData.cards[2].features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </CustomCardMap>
                    </div>
                    <br />
                    <br />
                    <br />
                // Or We can use like this also in the bottom it is used as a map with slice
                    <br />
                    <br />
                    <br />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
                        {ArrayData.cards.slice(0, 3).map((card, idx) => (
                            <CustomCardMap
                                key={card.id}
                                title={card.title}
                                description={card.description}
                                image={card.image}
                            >
                                <ul className="text-left list-disc pl-5 mt-2">
                                    {card.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </CustomCardMap>
                        )
                        )}
                    </div>
                </div>
        },
        {
            id: 16,
            name: 'Conditional Rendering',
            type: 'codePreview',
            code: `// Conditional Rendering Components
            export const validPassword = () => { <h1>Valid Password</h1> }
            export const InvalidPassword = () => { <h1>InValid Password</h1> }
            
            export const Password = ({ isvalid }) => {
                if (isvalid) {
                    return (
                        <h1>Valid Password</h1>
                    )
                }
            
                return (
                    <h1> InValid Password</h1 >
                )
            }`,
            preview:
                <div>
                    <Password isValid={true} />
                    <br />

                    <ConditionalRenderingItem name='mouse' isPacked={true} />
                    <br />
                    <br />
                    <FeaturedProduct
                        name={name}
                    />
                    <br />
                    <MultipleProduct />
                    <br />
                    <h6><strong>Note:</strong></h6>
                    <ul>
                        <li>
                            It allow us to dynamically display different UI Components or content based specification.
                        </li>
                        <li>
                            This enables us to create interactive and more responsive user experiences
                        </li>
                    </ul>


                </div>

        },
        {
            id: 17,
            name: 'Conditional Redendering with Ternary',
            type: 'codePreview',
            code: `// Conditional Rendering with Ternary Operator
            export const PasswordTernary = ({isValid}) => {
                return (
                    isValid ? <ValidPassword /> : <InvalidPassword />
                )
            }
            `,
            preview:
                <div>
                    <PasswordTernary isValid={true} >
                        Test
                    </PasswordTernary>
                    <br />
                    <br />
                    <h6><strong>In arrow functions:</strong></h6>
                    <ul>
                        <li>
                            {"() => <JSX /> → implicit return, no return keyword needed"}
                        </li>
                        <li>
                            {"() => { <JSX /> } → explicit return required, otherwise returns undefined"}
                        </li>
                    </ul>
                </div>
        },
        {
            id: 18,
            name: 'Conditional Rendeering with Cart Example',
            type: 'codePreview',
            code: `// Conditional Rendering With Cart
            export const CartRender = () => {
                return (
                    <div>
                        Cart
                    </div>
                )
            }`,
            preview:
                <CartRender />
        },
        {
            id: 19,
            name: 'Ex: Conditional Rendering Based on Weather',
            type: 'codePreview',
            code: `// Exercise Conditional Rendering
            export const ExerciseWeatherNormal = ({ temprature }) => {
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
            }`,
            preview:
                <ExerciseWeather temprature={14} />
        },
        {
            id: 20,
            name: 'Ex: Weather with Ternary Operator',
            type: 'codePreview',
            code: `// Exercise Weather with Ternary Operator
            export const ExerciseWeatherTernary = ({ temprature }) => {
                return (
                    (temprature < 15) ? <h1>It's Cold Outside </h1> :
                    (temprature >= 15 && temprature <= 25) ?<h1>It's Normal Weather </h1> :
                    <h1>It's Hot Outside </h1>
                )
            }`,
            preview:
                <ExerciseWeatherTernary temprature={30} />
        },
        {
            id: 21,
            name: 'Ex: with User Status',
            type: 'codePreview',
            code: `// Excercise UserStatus with the && Operator
            export const UserStatus = ({ isLoggedIn, isAdmin }) => {
                return (
                    (isLoggedIn && isAdmin) ? <h1>Welcome Admin</h1> : <h1>Welcome User</h1>
                )
            }`,
            preview:
                <div>
                    <UserStatus isLoggedIn={true} isAdmin={false} />
                </div>
        },
        {
            id: 22,
            name: 'Ex: with Greeting Day Message',
            type: 'codePreview',
            code: `// Excercise Morning Day Status
            export const DayStatus = ({ timeOfDay }) => {
                return (
                    (timeOfDay === 'morning') ? <h1>Good Morning!</h1> :
                        (timeOfDay === 'afternoon') ? <h1>Good Afternoon!</h1> :
                            (timeOfDay === 'evening') ? <h1>Good Evening!</h1> :
                                <h1>Good Night!</h1>
                )
            }`,
            preview:
                <DayStatus timeOfDay='' />
        },
        {
            id: 23,
            name: 'Inline Styles in React',
            type: 'codePreview',
            code: `// Inline Styles in React
            export const InlineStyles = () => {
                const styles = { color: 'red', fontSize: '2rem', fontWeight: 'bold', backgroundColor: 'black', padding: '1rem', borderRadius: '0.5rem' }
                return (
                    <div>
                        <h6><strong>Styles with constant styles</strong></h6>
                        <div style={styles}>Inline Styles</div>
                        <br />
                        {/* OR */}
                        <br />
                        <h6><strong>Styles with inline styles</strong></h6>
                        <div style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', backgroundColor: 'maroon', padding: '1rem', borderRadius: '0.5rem' }}> Inline Styles</div >
                    </div>
                )
            }`,
            preview:
                <InlineStyles />
        },
        {
            id: 24,
            name: 'React Icons',
            type: 'codePreview',
            code: `
                export const ReactIcons = () => {
                    <FcHome /> 
            }`,
            preview: <ReactIcons />


        },
        {
            id: 25,
            name: 'Ex: with Styled Card',
            type: 'codePreview',
            code: `// Exercise with Style Card
            
            export const StyleCard = () => {
                return (
                    <>
            
                        <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px', color: 'white' }}>
                            <h2 style={{fontSize: '20px'}} >Inline Styled</h2 >
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
                            <h2 style={{fontSize: '20px'}} >style by Object</h2 >
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ex repudiandae tempore tempora iste. Iure eum architecto dicta dolorem adipisci est quisquam, reiciendis dolorum voluptatum quos eaque minus, amet animi.</p>
                        </div>
                    </>
                )
            }
            `,
            preview:
                <>
                    <StyleCard />
                    <ProfileCard />
                </>

        },
        {
            id: 26,
            name: 'Event - Click',
            type: 'codePreview',
            code: `// Events on Elements - Click
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
            }`,
            preview:
                <>
                    <AddEvents />
                </>
        },
        {
            id: 27,
            name: 'Event - Copy',
            type: 'codePreview',
            code: `// Events on Elements - Copy
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
            }`,
            preview:
                <>
                    <Copy />
                </>
        },
        {
            id: 28,
            name: 'Event - Select',
            type: 'codePreview',
            code: `// Events on Elements - Select
            export const Select = () => {
                const selectHandler = () => {
                    const selection = window.getSelection().toString();
                    const messageEl = document.getElementById('select-message');
                    if (selection) {
                        messageEl.innerHTML = \`Your selected content is : <strong> {selection}</strong>\`;
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
            }`,
            preview:
                <>
                    <Select />
                </>
        },
        {
            id: 29,
            name: 'Event - Move',
            type: 'codePreview',
            code: `// Events on Elements - Move
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
            }`,
            preview:
                <>
                    <Move />
                </>
        },
        {
            id: 31,
            name: 'Use State',
            type: 'codePreview',
            code: `// Use State
            export const Counter = () => {
                const [count, setCount] = useState(0);
            
                const increment = () => setCount(count + 1);
                const decrement = () => setCount(count - 1);
            
                return (
                    <div className='counter-card'>
                        <h1>{count}</h1>
                        <div className='flex gap-2 mt-2'>
                            <button className='cstm' style={{minWidth: '35px'}} onClick={decrement}>-</button>
                            <button className='cstm' style={{minWidth: '35px'}} onClick={increment}>+</button>
                        </div>
                    </div>
                )
            }`,
            preview:
                <Counter />
        },
        {
            id: 32,
            name: 'Array of content with use state',
            type: 'codePreview',
            code: `// Array Content Use State
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
                    }`,
            preview:
                <div style={{ maxHeight: 'calc(100vh - 275px)', overflow: 'auto' }}>
                    <ArrayContent />
                    <br />
                    <ArrayContentAddnewElement />
                    <br />
                    <ArrayContentRemoveNewElement />
                    <br />
                    <ArrayContentExistingElement />
                </div>
        },
        {
            id: 33,
            name: 'Object of content with use state',
            type: 'codePreview',
            code: `// Use State
            `,
            preview:
                <div style={{ maxHeight: 'calc(100vh - 275px)', overflow: 'auto' }}>
                    <ObjectContent />
                    <br />
                    <ObjectContentChangeRating />
                </div>
        },
        {
            id: 34,
            name: 'Array of Objects with Use State',
            type: 'codePreview',
            code: ``,
            preview:
                <div style={{ maxHeight: 'calc(100vh - 275px)', overflow: 'auto' }}>
                    <ArrayOfObjects />
                </div>
        },
        {
            id: 35,
            name: 'Share State to other Component',
            type: 'codePreview',
            code: ``,
            preview:
                <div style={{ maxHeight: 'calc(100vh - 275px)', overflow: 'auto' }}>
                    <ShareStateToOther />
                </div>
        },
        {
            id: 36,
            name: 'Single Card',
            type: 'codePreview',
            code: `

            `,
            preview:
                <>
                    <h6>Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.</h6>
                    <FeaturedProduct
                        name={ArrayData.products[0].name}
                        price={ArrayData.products[0].price}
                        image={ArrayData.products[0].image}
                        inStock={ArrayData.products[0].inStock}
                    />
                </>

        },
        {
            id: 37,
            name: 'Multiple Cards',
            type: 'codePreview',
            code: `

            `,
            preview:
                <>
                    <h6>Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like if statements, &&, and ? : operators.</h6>


                    <h6 className='font-semibold'>Multiple Cards</h6>

                    <div className="grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {ArrayData.products.map(({ id, name, price, inStock, image }) => (
                            <MultipleProduct
                                key={id}
                                name={name}
                                price={price}
                                inStock={inStock}
                                image={image}
                                className=""
                            />
                        ))}
                    </div>
                </>

        },
        {
            id: 38,
            name: 'Form Controlled Components',
            type: 'codePreview',
            code: ``,
            preview:
                <div style={{ maxHeight: 'calc(100vh - 275px)', overflow: 'auto' }}>
                    <FormControlled />
                </div>
        },
        {
            id: 39,
            name: 'Use State Examples',
            type: 'codePreview',
            code: ``,
            preview:
                <div className="">
                    <ExampleUseState />
                    <br />
                    <UsWithArray />
                    <br />
                    <UsProfile />
                    <br />
                    <ShoppingList />
                </div>
        },
        {
            id: 50,
            name: 'Examples',
            type: 'codePreview',
            code: `const Examples = () => {
                const example1MyName = "Heller"
                const example1Multiply = (a, b) => a * b;
                const example1dynaClass = "MustBeRed"
                return (
                    <div>
                        <p>Add Expression : {2 + 2}</p>
                        <p>My Name : {example1MyName}</p>
                        <p>Random Number : {Math.random()}</p>
                        <p>My Friend List : {["Alex, Bob, Cherry"]}</p>
                        <p>Expression Multiply: {example1Multiply(3, 5)}</p>
                        <p>Conditional Rendering : {2 > 3 ? 'R' : 'W'}</p>
                        <p className={example1dynaClass}>Example1 Dyna Class : {example1dynaClass}</p>
                    </div>
                )
            }
            export default Examples; `,
            preview:
                <div>
                    <div className="">
                        <p>Add Expression : {2 + 2}</p>
                        <p>My Name : {ArrayData.example1MyName}</p>
                        <p>Random Number : {Math.random()}</p>
                        <p>My Friend List : {['Alex, Bob, Cherry']}</p>
                        <p>Expression Multiply: {ArrayData.example1Multiply(3, 5)}</p>
                        <p>Conditional Rendering : {2 > 3 ? 'R' : 'W'}</p>
                        <p className={ArrayData.example1dynaClass}>Example1 Dyna Class : {ArrayData.example1dynaClass}</p>

                    </div>
                </div>
        },
        {
            id: 51,
            name: 'Eg : Lazy Initializer',
            type: 'codePreview',
            code: `import React, { useState } from 'react'
            import { InteractiveDemo } from './InteractiveDemo';
            import { InteractiveDemoVisual } from './InteractiveVisualDemo';
            
            const ExampleOne = () => {
                const [count, setCount] = useState(() => {
                    const initialCount = 10;
                    return initialCount;
                })
            
                const increment = () => {
                    setCount(count => count + 1);
                }
            
                const [countNormal, setCountNormal] = useState(0);
                const [countFunctional, setCountFunctional] = useState(0);
            
                // Normal increment (may fail if called multiple times in a row)
                const incrementNormalTwice = () => {
                    setCountNormal(countNormal + 1);
                    setCountNormal(countNormal + 1);
                    console.log("Normal count after 2 increments:", countNormal);
                };
            
                // Functional increment (always correct)
                const incrementFunctionalTwice = () => {
                    setCountFunctional(c => c + 1);
                    setCountFunctional(c => c + 1);
                    console.log("Functional count after 2 increments:", countFunctional);
                };
            
                return (
                    <div style={{ maxHeight: 'calc(100vh - 275px)' , overflow: 'auto'}}>
                        <h6 className='font-semibold'>Example One With lazy initializer</h6>
                        <ul>
                            <li>If you pass a function instead of a value, React will call that function only once — the very first time the component renders</li>
                            <li>
                                {/* const [count, setCount] = useState(() => {
                                    console.log("Initializing count...");
                                return 5; // or any computed value
                                }); */}
                                That’s called lazy initialization — it "lazily" runs the function only when needed.
                            </li>
                            <li className='font-semibold'>Why it is useful?</li>
                            <li>The function runs only once (on the first render).
            
                                If you had written useState(localStorage.getItem("count")), it would try to read localStorage every time the component re-renders, which is inefficient.</li>
                        </ul>
                        <p>
                            Count: {count}
                        </p>
            
                        <button className='cstm m-1' onClick={increment}>Increment</button>
                        <br />
                        <br />
            
                        <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
                            <h2>Normal Counter (may fail)</h2>
                            <p>{countNormal}</p>
                            <button className='cstm m-1' onClick={incrementNormalTwice}>Increment Twice</button>
            
                            <hr style={{ margin: "20px 0" }} />
            
                            <h2>Functional Counter (always correct)</h2>
                            <p>{countFunctional}</p>
                            <button className='cstm m-1' onClick={incrementFunctionalTwice}>Increment Twice</button>
                        </div>
            
                        <br />
                        <br />
                        <h6 className='font-semibold'>Example One With Interactive Demo</h6>
                        <InteractiveDemo />
            
                        <br />
                        <br />
                        <h6 className='font-semibold'>Example One With Interactive Demo Visual</h6>
                        <InteractiveDemoVisual />
                    </div>
                )
            }
            
            export default ExampleOne `,
            preview:
                <div >
                    <div className="">
                        <ExampleOne />
                    </div>
                </div>
        },
        {
            id: 52,
            name: 'Eg : Random Number',
            type: 'codePreview',
            code: `ssdsd`,
            preview:
                <div >
                    <div className="">
                        <ExampleTwo />
                    </div>
                </div>
        },
        {
            id: 53,
            name: 'Eg : Local Storage',
            type: 'codePreview',
            code: `
            import React, { useEffect, useState } from 'react'
            
            const ExampleThree = () => {
                const [name, setName] = useState(() => {
                    const savedName = localStorage.getItem('name');
                    return savedName ? JSON.parse(savedName) : ''
                })
            
                useEffect(() => {
                    localStorage.setItem('name', JSON.stringify(name))
                }, [name])
            
                const handleChange = (event) => {
                    setName(event.target.value);
                }
                const handleClear = () => {
                    setName('');
                }
                return (
                    <div>
                        <h6>Your Name : {name}</h6>
                        <input type="text" value={name} onChange={handleChange} placeholder='Enter your name' className='cstm-input' />
                        <button onClick={handleClear} className='cstm m-1'>Clear Name</button>
                    </div>
                )
            }
            
            export default ExampleThree
            
            Code Analysis: 
            -------------------------------------------------
            1) import React, { useEffect, useState } from 'react'
            -------------------------------------------------
                import React → React library import kar rahe hain.

                { useEffect, useState } → Ye React hooks hai:

                useState → state create karne ke liye

                useEffect → side-effects manage karne ke liye (e.g., API call, localStorage)

                'react' → package name jahan se import kar rahe hain

            -------------------------------------------------
            2) const ExampleThree = () => {
            -------------------------------------------------
                const ExampleThree → Ye React functional component ka naam

                = () => { ... } → Arrow function jo component ka body define karta hai

                Functional components me render function ye arrow function hota hai

            -------------------------------------------------
            3) const [name, setName] = useState(() => {
                    const savedName = localStorage.getItem('name');
                    return savedName ? JSON.parse(savedName) : ''
                })
            -------------------------------------------------
                3.1) Break it down:

                    const [name, setName] → Array destructuring

                    name → current state value (yaha user ka name)

                    setName → function jo state update karega

                3.2) useState(() => { ... }) → Lazy initialization

                    Arrow function pass kar rahe hain → function sirf first render pe execute hoga

                    Advantage: LocalStorage se value read karne me performance better hoti hai

                3.3) Inside the Function
            -------------------------------------------------
            4) const savedName = localStorage.getItem('name');
            -------------------------------------------------
                localStorage.getItem('name') → browser ke localStorage me 'name' key se value read karta hai

                Agar user pehle name type karke page reload kiya hai → ye value wapas milegi
            -------------------------------------------------
            5) return savedName ? JSON.parse(savedName) : ''
            -------------------------------------------------
                Agar savedName exist karta hai → JSON.parse(savedName) → string me convert karke return karo

                Agar exist nahi karta → empty string '' return karo

                Ye initial state ban jaati hai name ki
            -------------------------------------------------
            6) useEffect(() => {
                    localStorage.setItem('name', JSON.stringify(name))
                }, [name])
            -------------------------------------------------
                6.1) useEffect(() => { ... }, [name]) → Ye side-effect hook hai

                    Callback function () => { ... } tab chalta hai jab dependency change ho

                    [name] → dependency array → isme jo values honge, unke change hone pe useEffect run hoga

                6.2) Inside useEffect:
            -------------------------------------------------
            7) localStorage.setItem('name', JSON.stringify(name))
            -------------------------------------------------
                localStorage.setItem('name', ...) → localStorage me 'name' key ke saath value save kar raha hai

                JSON.stringify(name) → state value ko string me convert kar raha hai (localStorage me hamesha string store hota hai)

                💡 Purpose:

                Har baar user type kare → name update hota hai → localStorage me save ho jaata hai → page reload pe bhi value retained rahe
            -------------------------------------------------
            8) const handleChange = (event) => {
                    setName(event.target.value);
                }
            -------------------------------------------------
                handleChange → function jo input ke change event me call hota hai

                event → input field ka event object

                event.target.value → input box ka current text value

                setName(event.target.value) → state update kar raha hai → component re-render hoga
            -------------------------------------------------
            9) const handleClear = () => {
                    setName('');
                }
            -------------------------------------------------
                handleClear → function jo Clear button click pe call hota hai

                setName('') → state ko empty string set kar deta hai → input box clear ho jaata hai
            -------------------------------------------------
            10) return (
                    <div>
                        <h6>Your Name : {name}</h6>
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                            className='cstm-input'
                        />
                        <button onClick={handleClear} className='cstm m-1'>Clear Name</button>
                    </div>
                )
            -------------------------------------------------
                Step by Step:

                    10.1)  <div> → parent container

                    10.2)  <h6>Your Name : {name}</h6> →

                            Display karta hai current state (name)

                            {name} → JSX me JavaScript expression insert karna

                    10.3)  <input ... /> → Input field

                            type="text" → text input

                            value={name} → controlled component → input value state se bind hai

                            onChange={handleChange} → user typing pe state update hota hai

                            placeholder='Enter your name' → empty input me placeholder text

                            className='cstm-input' → custom CSS class

                    10.4)  <button onClick={handleClear}>Clear Name</button> →

                            Button click → input clear ho jaata hai

            -------------------------------------------------
            11) export default ExampleThree
            -------------------------------------------------
                Ye line component ko export karta hai

                Taaki kisi bhi file me import karke use kar sako

            `,
            preview:
                <div >
                    <div className="">
                        <ExampleThree />
                    </div>
                </div>
        }
    ];
}

export default getTabs;
