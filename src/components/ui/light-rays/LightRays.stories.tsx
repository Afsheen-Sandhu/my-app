import type { Meta, StoryObj } from '@storybook/react';
import LightRays from './LightRays';

const meta: Meta<typeof LightRays> = {
  title: 'UI/LightRays',
  component: LightRays,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof LightRays>;

export const LightRaysStory: Story = {
  args: {
    // raysOrigin expects one of the named anchors defined in the component
    // use the default "top-center" anchor instead of a coordinate object
    raysOrigin: 'top-center',
    raysColor: '#ffffff',
    raysSpeed: 0.1,
    lightSpread: 0.1,
    rayLength: 1.0,
    pulsating: true,
    fadeDistance: 0.1,
    saturation: 1.0,
    followMouse: true,
    mouseInfluence: 0.1,
    noiseAmount: 0.1,
    distortion: 0.1,
    className: 'w-full h-full',
  },
  name: 'LightRays',
};
