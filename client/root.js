import {element} from 'deku';

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
