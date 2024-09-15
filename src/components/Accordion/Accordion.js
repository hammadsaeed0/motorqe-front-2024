import { motion } from 'framer-motion';
export default function Accordion(props) {
    return (
        <div className="border rounded-md mb-4">
            <button
                className="w-full p-4 flex gap-3 text-left transition duration-300"
                onClick={props.toggleAccordion}
            >
                {props.isOpen ? (
                    <motion.img 
                        src={require('../../assets/images/mins.png')} 
                        className="w-6 mt-2"
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{ duration: 0.3 }}
                    />
                ) : (
                    <motion.img 
                        src={require('../../assets/images/plus.png')}  
                        className="w-6"
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{ duration: 0.3 }}
                    />
                )}
                
                <div>
                    <h6 className="h6 uppercase font-semibold text-textColor">{props.title}</h6>
                    <motion.div 
                        initial={false}
                        animate={{ height: props.isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {props.isOpen && (
                            <div className="bg-white uppercase text-sm text-textColor font-medium">
                                {props.data}
                            </div>
                        )}
                    </motion.div>
                </div>
            </button>
        </div>
    );
}