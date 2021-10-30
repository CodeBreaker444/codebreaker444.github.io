---
layout: post
title:  Solving💪🏻 Mountain Car🚙 Continuous problem using Proximal Policy Optimization - Reinforcement Learning
categories: [Artificial Intelligence, Deep learning]
---

Proximal Policy Optimization (PPO) is a popular state-of-the-art Policy Gradient Method. It is supposed to learn relatively quickly and stable while being much simpler to tune, compared to other state-of-the-art approaches like TRPO, DDPG or A3C. This makes PPO often the first choice when it comes to solving a problem for the first time. PPO strongly builds on Trust Region Policy Optimization (TRPO). 

It applies the key concepts of TRPO like Importance Sampling, that provides better data efficiency as well as an extended version of TRPO’s KL penalty, that controls the update size in the optimization step. Moreover, PPO presents an alternative, simpler method called Clipped Surrogate Objective for controlling the optimization step size.

Let’s solve the MountainCar Continuous problem using PPO. MountainCar
Continuous involves a car trapped in the valley of a mountain. It has to
apply throttle to accelerate against gravity and try to drive out of the
valley up steep mountain walls to reach a desired flag point on the top
of the mountain. This problem is very challenging, as the agent cannot
just apply full throttle from the base of the mountain and try to reach
the flag point, as the mountain walls are steep and gravity will not
allow the car to achieve sufficient enough momentum. The optimal
solution is for the car to initially go backward and then step on the
throttle to pick up enough momentum to overcome gravity and successfully
drive out of the valley. We will see that the RL agent actually learns
this trick.

**<u>PPO Algorithm</u>:**

**Setting the neural network initializers**:

setting the neural network parameters (we will use two hidden layers)
and the initializers for the weights and biases. Use the Xavier
initializer for the weights and a small positive value for the initial
values of the biases.

**Define the PPO** **class**:

The PPO() class is now defined. First, the \_\_init\_\_() constructor is
defined using the arguments passed to the class. Here, sess is the
TensorFlow session.

-   S\_DIM and A\_DIM are the state and action dimensions,
    respectively. 

-   A\_LR and C\_LR are the learning rates for the actor and the critic,
    respectively.

-   A\_UPDATE\_STEPS and C\_UPDATE\_STEPS are the number of update steps
    used for the actor and the critic.

-   CLIP\_METHOD stores the epsilon value.

**Define TensorFlow placeholders**: We will next need to define the
TensorFlow placeholders: tfs for the state, tfdc\_r for the discounted
rewards, tfa for the actions, and tfadv for the advantage function.

**Define the critic**: The critic neural network is defined next. We use
the state (*s<sub>t</sub>*) placeholder, self.tfs, as input to the
neural network. Two hidden layers are used with
the nhidden1 and nhidden2 number of neurons and the relu activation
function (both nhidden1 and nhidden2 were set to 64 previously). The
output layer has one neuron that will output the state value
function *V(s<sub>t</sub>)*, and so no activation function is used for
the output. We then compute the advantage function as the difference
between the discounted cumulative rewards, which is stored in
the self.tfdc\_r placeholder and the self.v output that we just
computed. The critic loss is computed as an L2 norm and the critic is
trained using the Adam optimizer with the objective to minimize this L2
loss

**Call the** **\_build\_anet** **function**: We define the actor using
a \_build\_anet() function that will soon be specified. Specifically,
the policy distribution and the list of model parameters are output from
this function. We call this function once for the current policy and
again for the older policy. The mean and standard deviation can be
obtained from self.pi by calling the mean() and stddev() functions,
respectively

**Sample actions**: From the policy distribution, self.pi, we can also
sample actions using the sample() function that is part of TensorFlow
distributions

**Update older policy parameters**: The older policy network parameters
can be updated using the new policy values simply by assigning the
values from the latter to the former, using
TensorFlow's assign() function. Note that the new policy is optimized –
the older policy is simply a copy of the current policy, albeit from one
update cycle earlier

**Compute policy distribution ratio**: The policy distribution ratio is
computed at the self.tfa action, and is stored in self.ratio. Note that,
exponentially, the difference of logarithms of the distributions is the
same as the ratio of the distributions. This ratio is then clipped to
bound it between *1-ε* and *1+ε*, as explained earlier in the theory

**Compute losses**: The total loss for the policy, as mentioned
previously, involves three losses that are combined when the policy and
value neural networks share weights. However, since we consider the
other setting mentioned in the theory earlier in this chapter, where we
have separate neural networks for the policy and the value, we will have
two losses for the policy optimization. The first is the minimum of the
product of the unclipped ratio and the advantage function and its
clipped analogue—this is stored in self.aloss. The second loss is the
Shannon entropy, which is the product of the policy distribution and its
logarithm, summed over, and a minus sign included. This term is scaled
with the hyper parameter, *c<sub>1</sub>* = 0.01, and subtracted from
the loss. For the time being, the entropy loss term is set to zero, as
it also is in the PPO paper. We can consider including this entropy loss
later to see if it makes any difference in the learning of the policy.
We use the Adam optimizer. Note that we need to maximize the original
policy loss mentioned in the theory earlier in this chapter, but the
Adam optimizer has the minimize() function, so we have included a minus
sign in self.aloss (see the first line of the following code), as
maximizing a loss is the same as minimizing the negative of it

**Define the** **update** **function**: The update() function is defined
next, which takes the s state, the a action, and the r reward as
arguments. It involves running a TensorFlow session on updating the old
policy network parameters by calling the
TensorFlow self.update\_oldpi\_op operation. Then, the advantage is
computed, which, along with the state and action, is used to update
the A\_UPDATE\_STEPS actor number of iterations. Then, the critic is
updated by the C\_UPDATE\_STEPS number of iterations by running a
TensorFlow session on the critic train operation

**Define the** **\_build\_anet** **function**: We will next define
the \_build\_anet() function that was used earlier. It will compute the
policy distribution, which is treated as a Gaussian (that is, normal).
It takes the self.tfs state placeholder as input, has two hidden layers
with the nhidden1 and nhidden2 neurons, and uses the relu activation
function. This is then sent to two output layers with the A\_DIM  action
dimension number of outputs, with one representing the mean, mu, and the
other the standard deviation, sigma. Note that the mean of the actions
are bounded, and so the tanh activation function is used, including a
small clipping to avoid edge values; for sigma, the softplus activation
function is used, shifted by 0.1 to avoid zero sigma values. Once we
have the mean and standard deviations for the actions, TensorFlow
distributions' Normal is used to treat the policy as a Gaussian
distribution. We can also call tf.get\_collection() to obtain the model
parameters, and the Normal distribution and the model parameters are
returned from the function

**Define the** **choose\_action** **function**: We also define
a choose\_action() function to sample from the policy to obtain actions

**Define the** **get\_v** **function**: Finally, we also define
a get\_v() function to return the state value by running a TensorFlow
session on self.v

**<u>Setting up the environment</u>:**

**Define function:** We then define a function for reward shaping that
will give out some extra bonus rewards and penalties for good and bad
performance, respectively. We do this for encouraging the car to go
higher towards the side of the flag which is on the mountain top,
without which the learning will be slow

We next choose MountainCarContinuous as the environment. The total
number of episodes we will train the agent for is EP\_MAX, and we set
this to 1000. The GAMMA discount factor is set to 0.9 and the learning
rates to 2e-4. We use a batch size of 32 and perform 10 update steps per
cycle. The state and action dimensions are obtained and stored
in S\_DIM and A\_DIM, respectively. For the PPO clip parameter, epsilon,
we use a value of 0.1. train\_test is set to 0 for training the agent
and 1 for testing

We create a TensorFlow session and call it sess. An instance of
the PPO class is created, called ppo. We also create a TensorFlow saver.
Then, if we are training from scratch, we initialize all the model
parameters by calling tf.global\_variables\_initializer(), or, if we are
continuing the training from a saved agent or testing, then we restore
from the ckpt/model path

The main for loop over episodes is then defined. Inside it, we reset the
environment and also set buffers to empty lists. The terminal
Boolean, done, and the number of time steps, t, are also initialized

Inside the outer loop, we have the inner while loop over time steps.
This problem involves short time steps during which the car may not
significantly move, and so we use sticky actions where actions are
sampled from the policy only once every 8 time steps.
The choose\_action() function in the PPO class will sample the actions
for a given state. A small Gaussian noise is added to the actions to
explore, and are clipped in the -1.0 to 1.0 range, as required for
the MountainCarContinuous environment. The action is then fed into the
environment's step() function, which will output the
next s\_ state, r reward, and the terminal done Boolean.
The reward\_shaping() function is called to shape rewards. To track how
far the agent is pushing its limits, we also compute its maximum
position and speed in max\_pos and max\_speed, respectively

If we are in training mode, the state, action, and reward are appended
to the buffer. The new state is set to the current state and we proceed
to the next time step if the episode has not already terminated.
The ep\_r episode total rewards and the t time step count are also
updated

If we are in the training mode, if the number of samples is equal to a
batch, or if the episode has terminated, we will train the neural
networks. For this, the state value for the new state is first obtained
using ppo.get\_v. Then, we compute the discounted rewards. The buffer
lists are also converted to NumPy arrays, and the buffer lists are reset
to empty lists. These bs, ba, and br NumPy arrays are then used to
update the ppo object's actor and critic networks

If we are in testing mode, Python is paused briefly for better
visualization. If the episode has terminated, the while loop is exited
with a break statement. Then, we print the maximum position and speed
values on the screen, as well as write them, along with the episode
rewards, to a file called performance.txt. Once every 10 episodes, the
model is also saved by calling saver.save

**<u>Evaluating the performance</u>:**

**Full throttle**

Note that we had to navigate backward first and then step on the
throttle in order to have sufficient momentum to escape gravity and
successfully drive out of the mountain valley. What if we had just
stepped on the throttle right from the first step – would the car still
be able to escape?

We will now set the action to 1.0, that is, full throttle: As is evident
from the video generated during the training, the car is unable to
escape the inexorable pull of gravity, and remains stuck at the base of
the mountain valley.

**Random throttle**

What if we try random throttle values? We set the values with random
actions in the -1.0 to 1.0 range

Here too, the car fails to escape gravity and remains stuck at the base.
So, the RL agent is required to figure out that the optimum policy here
is to first go backward, and then step on the throttle to escape gravity
and reach the flag on the mountain top
```
nearing flag: \[0.40197912 0.03460513\] \[-0.01053336\]

nearing flag: \[0.43560933 0.03363021\] \[-0.05525178\]

nearing flag: \[0.46858119 0.03297186\] \[-0.00404176\]

reached flag on mountain! \[0.46858119 0.03297186\] \[-0.00404176\]

values at done: \[0.46858119 0.03297186\] \[-0.00404176\]

episode: 0 | episode reward: 85.0265 | time steps: 401

max\_pos: 0.46858118582758373 | max\_speed: 0.06316450856593404

----------------------------------------------------------------------

nearing flag: \[0.41649966 0.03903642\] \[-0.35404512\]

nearing flag: \[0.45439475 0.03789509\] \[-0.2345565\]

reached flag on mountain! \[0.45439475 0.03789509\] \[-0.2345565\]

values at done: \[0.45439475 0.03789509\] \[-0.2345565\]

episode: 1 | episode reward: 74.5208 | time steps: 760

max\_pos: 0.4543947454824115 | max\_speed: 0.06026767201058934

----------------------------------------------------------------------

nearing flag: \[0.40590966 0.03197592\] \[0.56079626\]

nearing flag: \[0.43793569 0.03202603\] \[0.6097038\]

nearing flag: \[0.46910794 0.03117225\] \[-0.14556652\]

reached flag on mountain! \[0.46910794 0.03117225\] \[-0.14556652\]

values at done: \[0.46910794 0.03117225\] \[-0.14556652\]

episode: 2 | episode reward: 72.0098 | time steps: 649

max\_pos: 0.46910794085174023 | max\_speed: 0.06396141357900643

----------------------------------------------------------------------
```