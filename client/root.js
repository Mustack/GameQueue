import {element} from 'deku';
import increment from './increment';

const Root = {
    render({context}) {
        return (
            <div>
                <div>
                    This is the Deku-Boilerplate
                </div>
                <div>
                    Current Count: {1}
                </div>
                <button>Increment</button>
            </div>
        );
    }
};

export default Root;
