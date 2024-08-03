import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Text, Image, Group, Rect } from 'react-konva';
import background from '../assets/background.png';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Unsplash from '../components/Unsplash';
import glossaryData from '../data/glossary';
import Navbar from '../components/Navbar';

const Glossary = () => {
    const [titleProp, setTitleProp] = useState({
        title: "Acidification of Soil Acidity",
        fontSize: 100
    });

    const [definitionProp, setDefinitionProp] = useState({
        definition: "Soil pH is one of the most-important soil properties that affects the nutrient uptake by plants and thereby influencing the crop productivity. Any soil processes or management practices which lead to build-up of hydrogen cations (also called protons) in the soil results in soil acidification. If the pH is 4.5 to 5.5 then they are called moderate and if the pH is < 4.5, then they are mapped under severe category.",
        fontSize: 36
    });

    const stageRef = useRef(null);

    const [bgImage, setBgImage] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selected, setSelected] = useState({
        "term": "Abiotic",
        "definition": "Physical rather than biological; not derived from living organisms"
    });
    const [glossary, setGlossary] = useState([]);
    const [dragTitle, setDragTitle] = useState(false);
    const [dragDefinition, setDragDefinition] = useState(false);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        setTitleProp(prevState => ({
            ...prevState,
            title: selected.term
        }));
        setDefinitionProp(prevState => ({
            ...prevState,
            definition: selected.definition
        }));
    }, [selected]);

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

    useEffect(() => {
        setGlossary(glossaryData);
    }, [glossaryData]);

    const handleTitleChange = (event) => {
        setTitleProp(prevState => ({
            ...prevState,
            title: event.target.value
        }));
    };

    const handleTitleFontSizeChange = (event) => {
        setTitleProp(prevState => ({
            ...prevState,
            fontSize: event.target.value
        }));
    };

    const handleDefinitionChange = (event) => {
        setDefinitionProp(prevState => ({
            ...prevState,
            definition: event.target.value
        }));
    };

    const handleDefinitionFontSizeChange = (event) => {
        setDefinitionProp(prevState => ({
            ...prevState,
            fontSize: event.target.value
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

    const clipImage = (ctx, x, y, width, height, radius) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
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
            link.download = `${titleProp.title}.png`; // Set the desired filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    return (
        <>
            <Navbar page="glossary" />
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
                                <Group clipFunc={(ctx) => clipSquare(ctx, 75, 85, 1000, 260)}>
                                    <Rect fill='#f0f' width={1000} height={260} x={75} y={85} draggable visible={dragTitle} opacity={0.2} />
                                    <Text
                                        text={titleProp.title}
                                        x={75}
                                        y={85}
                                        fontSize={titleProp.fontSize}
                                        width={800}
                                        fontFamily='Montserrat, sans-serif'
                                        fontVariant='800'
                                        fill={'#FFE681'}
                                        draggable
                                        onDragStart={() => setDragTitle(true)}
                                        onDragEnd={() => setDragTitle(false)}
                                    />
                                </Group>
                                <Group clipFunc={(ctx) => clipSquare(ctx, 75, 350, 630, 750)}>
                                    <Rect fill='#ff0' width={630} height={750} x={75} y={350} draggable visible={dragDefinition} opacity={0.2} />
                                    <Text
                                        text={definitionProp.definition}
                                        x={75}
                                        y={350}
                                        fontSize={definitionProp.fontSize}
                                        lineHeight={1.4}
                                        width={560}
                                        fontFamily='Montserrat, sans-serif'
                                        fill={'#fff'}
                                        draggable
                                        onDragStart={() => setDragDefinition(true)}
                                        onDragEnd={() => setDragDefinition(false)}
                                    />
                                </Group>
                                <Group clipFunc={(ctx) => clipImage(ctx, 697, 500, 640, 550, 320)}>
                                    <Image
                                        image={image}
                                        x={700}
                                        y={500}
                                        width={640}
                                        height={555}
                                    // opacity={0.5}
                                    />
                                </Group>
                            </Layer>
                        </Stage>
                    </main>
                </div>
                <div className='relative p-8 flex flex-col overflow-y-auto'>
                    <div>
                        <button className='p-2 bg-green-500 text-white rounded-xl m-2' onClick={handleDownload}>Download</button>
                    </div>
                    <div className="flex flex-col">
                        <Listbox value={selected} onChange={setSelected}>
                            {({ open }) => (
                                <>
                                    <Label className="block text-sm font-medium leading-6 text-gray-900">Select Term</Label>
                                    <div className="relative">
                                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                            <span className="flex items-center">
                                                <span className="ml-3 block truncate">{selected.term}</span>
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </ListboxButton>

                                        <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {glossary.map((item) => (
                                                    <ListboxOption
                                                        key={item.term}
                                                        className={({ focus }) =>
                                                            classNames(
                                                                focus ? 'bg-indigo-600 text-white' : '',
                                                                !focus ? 'text-gray-900' : '',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({ selected, focus }) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                    >
                                                                        {item.term}
                                                                    </span>
                                                                </div>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            focus ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </ListboxOption>
                                                ))}
                                            </ListboxOptions>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>
                    <div className='flex flex-row'>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    value={titleProp.title}
                                    type="text"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="0.00"
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Font Size" className="block text-sm font-medium leading-6 text-gray-900">
                                Font Size
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    value={titleProp.fontSize}
                                    type="number"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="0.00"
                                    onChange={handleTitleFontSizeChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Definition
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    value={definitionProp.definition}
                                    type="text"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="0.00"
                                    onChange={handleDefinitionChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Font Size" className="block text-sm font-medium leading-6 text-gray-900">
                                Font Size
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <input
                                    value={definitionProp.fontSize}
                                    type="number"
                                    className="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="0.00"
                                    onChange={handleDefinitionFontSizeChange}
                                />
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

export default Glossary
