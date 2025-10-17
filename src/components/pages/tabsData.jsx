import React from 'react';
import {
    greetMessage,
    currentDateTime,
    currentDateInString,
    currentDateInNumber,
    example1MyName,
    example1Multiply,
    example1dynaClass,
    userInfo,
    data,
    mapArray,
    destructureArray,
    ParentProps,
    ParentPropsDestructring,
    PersonParentProps,
    ProductParentProps,
    CustomCard,
    CustomCardMap,
    cards,
    Password,
    PasswordTernary,
    CartRender,
    ExerciseWeather,
    ExerciseWeatherTernary,
    UserStatus,
    DayStatus
} from './tabsComponents';

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
                <h4 className='font-medium'>{greetMessage}</h4>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{currentDateTime}</p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{currentDateInString}</p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{currentDateInNumber}</p>
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
                {mapArray.map((number) => (
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
                        userInfo.map(({ username, email, age }, idx) => (
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
            name: 'React Table With Difference Data',
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
                        destructureArray.map(({ id, name, age }) => (
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
            name: 'Exercise: Using Props in React Components',
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
            name: 'Exercise: Using Props With Destructuring',
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
                            title={cards[0].title}
                            description={cards[0].description}
                            image={cards[0].image}
                        >
                            <ul className="text-left list-disc pl-5 mt-2">
                                {cards[0].features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </CustomCardMap>
                        <CustomCardMap
                            className="sm:w-1/3 w-full"
                            title={cards[1].title}
                            description={cards[1].description}
                            image={cards[1].image}
                        >
                            <ul className="text-left list-disc pl-5 mt-2">
                                {cards[1].features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </CustomCardMap>
                        <CustomCardMap
                            className="sm:w-1/3 w-full"
                            title={cards[2].title}
                            description={cards[2].description}
                            image={cards[2].image}
                        >
                            <ul className="text-left list-disc pl-5 mt-2">
                                {cards[2].features.map((feature, index) => (
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
            name: 'Exercise: Conditional Rendering Based on Weather',
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
            name: 'Exercise Weather with Ternary Operator',
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
            name: 'Excercise with User Status',
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
            name: 'Exercise with Greeting Day Message',
            type: 'codepPreview',
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
                <div>
                    <DayStatus timeOfDay='evening' />
                </div>
        },
        {
            id: 30,
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
            preview: <div>
                <p>Add Expression : {2 + 2}</p>
                <p>My Name : {example1MyName}</p>
                <p>Random Number : {Math.random()}</p>
                <p>My Friend List : {['Alex, Bob, Cherry']}</p>
                <p>Expression Multiply: {example1Multiply(3, 5)}</p>
                <p>Conditional Rendering : {2 > 3 ? 'R' : 'W'}</p>
                <p className={example1dynaClass}>Example1 Dyna Class : {example1dynaClass}</p>
            </div>
        }
    ];
}

export default getTabs;
