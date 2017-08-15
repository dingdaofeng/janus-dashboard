import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import block from '../../../../helpers/bem-cn';

import Row from '../../../Layout/Row/Row';
import Label from '../../../labels/Label';
import Input from '../../../inputs/Input';
import Radio from '../../../inputs/Radio/Radio';
import Hint from '../../../labels/Hint/Hint';
import ControlBar from '../ControlBar/ControlBar';
import HeadersSection from './HeadersSection/HeadersSection';

const propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    pluginFromValues: PropTypes.object.isRequired,
    pluginName: PropTypes.string.isRequired,
    handlePluginExclude: PropTypes.func.isRequired,
};

const RequestTransformerPlugin = ({ className, name, handlePluginExclude, plugin, pluginFromValues, pluginName }) => {
    const b = block(className);

    return (
        <div className={b('section')()}>
            <Row fullwidth>
                <Row col>
                    <Label>Plugin Name</Label>
                    <Input input={{value: 'Request Transformer'}} disabled />
                </Row>
                <ControlBar name={`${name}.enabled`} removePlugin={() => handlePluginExclude(pluginName)} />
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.add.headers`}
                    config={pluginFromValues.config.add.headers}
                    title="Add Header"
                />
                <Row col>
                    <Label>Limit Value</Label>
                    <Row>
                        <Row col>
                            <Field
                                name={`${name}.config.limit.value`}
                                type="text"
                                placeholder="Key"
                                component={Input}
                            />
                        </Row>
                        <Row col>
                            <Field
                                name={`${name}.config.limit.units`}
                                type="text"
                                placeholder="Value"
                                component={Input}
                            />
                        </Row>
                    </Row>
                    <Hint>The maximum number of requests that the Gateway will forward to the upstream_path.</Hint>
                </Row>
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.append.headers`}
                    config={pluginFromValues.config.append.headers}
                    title="Append Header"
                />
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.replace.headers`}
                    config={pluginFromValues.config.replace.headers}
                    title="Replace Header"
                />
            </Row>
            <Row className={b('row')()} fullwidth>
                <HeadersSection
                    name={`${name}.config.remove.headers`}
                    config={pluginFromValues.config.remove.headers}
                    title="Remove Header"
                />
            </Row>
        </div>
    );
};

RequestTransformerPlugin.propTypes = propTypes;

export default RequestTransformerPlugin;
