import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Text, Image, Group, Rect } from 'react-konva';
import background from '../assets/typinks_bg.png';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Textarea, Transition } from '@headlessui/react'
import Unsplash from '../components/Unsplash';
import Navbar from '../components/Navbar';

const Typinks = () => {
    // today date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const [celebration, setCelebration] = useState({
        day: 'Typinks Day',
        date: '2021-02-04',
        description: 'Typinks is for-profit',
        dayFontSize: 70,
        descriptionFontSize: 36,
        displayMonth: 'JUN',
        displayDate: '02',
        descriptionY: 950
    });

    const stageRef = useRef(null);
    const [bgImage, setBgImage] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [date, setDate] = useState(formattedDate);

    useEffect(() => {
        const img = new window.Image();
        img.src = background;
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            // Set the image to state once it is loaded
            setBgImage(img);
        };
    }, [background]);

    useEffect(() => {
        const ima = new window.Image();
        ima.src = selectedImage;
        ima.crossOrigin = 'Anonymous';
        ima.onload = () => {
            // Set the image to state once it is loaded
            setImage(ima);
        };
    }, [selectedImage]);

    // set uploaded image
    useEffect(() => {
        if (uploadedImage) {
            const ima = new window.Image();

            // Create a URL for the uploaded file
            const imageUrl = URL.createObjectURL(uploadedImage);
            ima.src = imageUrl;

            // Clean up the created URL after the image is loaded
            ima.onload = () => {
                console.log(imageUrl);
                setImage(ima);
                // URL.revokeObjectURL(imageUrl);
            };
        }
    }, [uploadedImage]);

    useEffect(() => {
        const dateParts = date.split('-');

        const months = {
            '01': 'JAN', '02': 'FEB', '03': 'MAR', '04': 'APR',
            '05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AUG',
            '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DEC'
        };

        setCelebration(prevState => ({
            ...prevState,
            displayDate: dateParts[2],
            displayMonth: months[dateParts[1]]
        }));
    }, [date]);

    const handleDayChange = (event) => {
        setCelebration(prevState => ({
            ...prevState,
            day: event.target.value
        }));
    };

    const handleDayFontSizeChange = (event) => {
        setCelebration(prevState => ({
            ...prevState,
            dayFontSize: event.target.value
        }));
    };

    const handleDescriptionChange = (event) => {
        setCelebration(prevState => ({
            ...prevState,
            description: event.target.value
        }));
    };

    const handleDescriptionFontSizeChange = (event) => {
        setCelebration(prevState => ({
            ...prevState,
            descriptionFontSize: event.target.value
        }));
    };

    const handleDescriptionYChange = (event) => {
        setCelebration(prevState => ({
            ...prevState,
            descriptionY: Number(event.target.value)
        }));
    };

    const clipSquare = (ctx, x, y, width, height) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x, y + height);
        ctx.lineTo(x, y);
        ctx.closePath();
    };

    const handleDownload = () => {
        if (stageRef.current) {
            const dataURL = stageRef.current.toDataURL({
                quality: 1,
                scale: 1,
                width: 1200,
                height: 1200,
                pixelRatio: 2
            });
            console.log(stageRef.current)
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `${celebration.day}.png`; // Set the desired filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    return (
        <>
            <Navbar page="typinks" />
            <div className='flex flex-row h-[90vh]'>
                <div className='w-1/2'>
                    <main className='absolute transform scale-50 -translate-x-36 -translate-y-72 -left-6'>
                        <Stage width={1200} height={1200} ref={stageRef} >
                            <Layer>
                                <Image
                                    image={bgImage}
                                    x={0}
                                    y={0}
                                    width={1200}
                                    height={1200}
                                />
                                <Group clipFunc={(ctx) => clipSquare(ctx, 90, 205, 1020, 490)}>
                                    <Image
                                        image={image}
                                        x={80}
                                        y={200}
                                        height={500}
                                        width={1100}
                                        offsetY={0}
                                    />
                                </Group>
                                <Group clipFunc={(ctx) => clipSquare(ctx, 210, 72, 228, 140)}>
                                    <Rect fill='#f60000' width={228} height={140} x={210} y={25} draggable visible={true} opacity={1} />
                                    <Text
                                        text={celebration.displayMonth}
                                        x={210}
                                        y={86}
                                        fontSize={80}
                                        width={225}
                                        fontFamily='Montserrat, sans-serif'
                                        fontVariant='900'
                                        align='center'
                                        fill={'#fff'}
                                        draggable
                                    />
                                </Group>
                                <Group clipFunc={(ctx) => clipSquare(ctx, 465, 72, 150, 140)}>
                                    <Rect fill='#1d2388' width={150} height={140} x={465} y={25} visible={true} opacity={1} />
                                    <Text
                                        text={celebration.displayDate}
                                        x={465}
                                        y={86}
                                        fontSize={80}
                                        width={150}
                                        fontFamily='Montserrat, sans-serif'
                                        fontVariant='900'
                                        align='center'
                                        fill={'#fff'}
                                        draggable
                                    />
                                </Group>
                                <Group clipFunc={(ctx) => clipSquare(ctx, 90, 730, 1025, 200)}>
                                    <Rect fill='#000' width={1200} height={400} x={0} y={730} visible={true} opacity={1} />
                                    <Text
                                        text={celebration.day}
                                        x={100}
                                        y={750}
                                        fontSize={celebration.dayFontSize}
                                        width={1100}
                                        fontFamily='Poppins, sans-serif'
                                        fill={'#fff'}
                                    />
                                </Group>
                                <Group clipFunc={(ctx) => clipSquare(ctx, 90, celebration.descriptionY, 1111, 600)}>
                                    <Rect fill='#000' width={1200} height={600} x={0} y={celebration.descriptionY} visible={true} opacity={1} />
                                    <Text
                                        text={celebration.description}
                                        x={100}
                                        y={celebration.descriptionY + 10}
                                        fontSize={celebration.descriptionFontSize}
                                        width={1000}
                                        fontFamily='Poppins-Regular, sans-serif'
                                        fill={'#fff'}
                                        lineHeight={1.2}
                                    />
                                </Group>
                            </Layer>
                        </Stage>
                    </main>
                </div>
                <div className='relative p-8 flex flex-col w-1/2 overflow-y-auto'>
                    <div>
                        <button className='p-2 bg-green-500 text-white rounded-xl m-2' onClick={handleDownload}>Download</button>
                    </div>
                    <div className='flex flex-col space-y-5'>
                        <div className='flex flex-row'>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Day
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm w-96">
                                    <input
                                        value={celebration.day}
                                        type="text"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={handleDayChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="Font Size" className="block text-sm font-medium leading-6 text-gray-900">
                                    Font Size
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        value={celebration.dayFontSize}
                                        type="number"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                        onChange={handleDayFontSizeChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Definition
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <Textarea onChange={handleDescriptionChange}
                                        cols={70} value={celebration.description}
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        {celebration.description}
                                    </Textarea>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="Font Size" className="block text-sm font-medium leading-6 text-gray-900">
                                    Font Size
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        value={celebration.descriptionFontSize}
                                        type="number"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                        onChange={handleDescriptionFontSizeChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="Y" className="block text-sm font-medium leading-6 text-gray-900">
                                    Y
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        value={celebration.descriptionY}
                                        type="number"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                        onChange={handleDescriptionYChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div>
                                <label htmlFor="Font Size" className="block text-sm font-medium leading-6 text-gray-900">
                                    Date
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        value={date}
                                        type="date"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div>
                                <label htmlFor="Upload Image" className="block text-sm font-medium leading-6 text-gray-900">
                                    Upload Image
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input
                                        type="file"
                                        className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setUploadedImage(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Unsplash setSelectedImage={setSelectedImage} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Typinks
