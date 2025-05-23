# Beginner's Guide: Claude with "Extended Thinking"

## What does this code do?

This notebook allows you to test a special feature of Claude called "Extended Thinking." This mode lets Claude "think out loud" before giving you a final answer, similar to when you solve a complex problem by writing out the steps on paper.

## Observations on Model Performance

Based on recent research and comparisons between Claude 3.7 and Claude 4:

1. **Inference Speed Difference**: Our tests show that Claude 3.7 often takes approximately twice as long for inference compared to Claude 4 when using Extended Thinking mode. This significant speed improvement in Claude 4 is likely because it provides a more condensed summary of its reasoning process rather than the full detailed thinking.

2. **Efficiency vs. Completeness Trade-off**: Claude 4 appears to better balance thinking efficiency and response quality. While Claude 3.7 might provide more extensive thinking output, Claude 4 seems to reach conclusions more efficiently without sacrificing accuracy.

3. **Architectural Improvements**: According to recent announcements from Anthropic, Claude 4 models (both Opus and Sonnet) incorporate significant architectural improvements over their 3.7 predecessors, which likely contribute to faster processing speed while maintaining or improving quality.

4. **Industry Benchmarks**: Both models implement "hybrid reasoning" capabilities, but Claude 4 shows enhanced performance on industry benchmarks while processing complex tasks more efficiently.

## Basic concepts to understand the code

Even if you've never programmed before, here are some concepts that will help you understand what's happening:

- **API**: A way to communicate with an online service (in this case, Claude).
- **Token**: Units of text that Claude uses (roughly a short word or part of a long word).
- **Model**: The specific version of Claude you're using (Claude 3.7 or Claude 4).
- **DataFrame**: A table of data (like an Excel spreadsheet).
- **Thinking Mode**: A special capability where the AI model deliberately takes more time to process complex problems and shows its reasoning process.
- **Inference**: The process of an AI model generating a response based on input; "inference time" refers to how long this takes.


## Steps to use the code

1. **Set up your API key**:
   - If you're using Google Colab, save your Anthropic API key in Colab's user data.
   - Or, directly insert your key in the code where indicated.

2. **Install the Anthropic library**:
   - Run the cell with `!pip install anthropic` to install the necessary library.

3. **Choose a question**:
   - We've prepared several example questions you can use.
   - You can also create your own question by modifying the variables.

4. **Run the test**:
   - Run the cell that contains the call to Claude.
   - Wait for Claude to process the response (it might take a few seconds).

5. **View the results**:
   - You'll first see Claude's "thinking" (its reasoning process).
   - Then you'll see the final formatted response.

6. **Compare models**:
   - The last part of the code compares the performance of Claude 3.7 and Claude 4.
   - It creates a table showing how long it takes the models to respond.

## Suggestions for experiments

- Try modifying the questions to see how Claude's "thinking" changes.
- Increase or decrease the `budget_tokens` to see how it affects the thinking process.
- Compare responses with and without the "thinking" mode enabled.
- Try questions in different fields (math, logic, business) to see how Claude's approach varies.
- Test the same prompts on both Claude 3.7 and Claude 4 to observe the differences in processing time and thinking output.
- Experiment with complex reasoning tasks to see how the models handle multi-step problems.

## Understanding Model Evolution

The evolution from Claude 3.7 to Claude 4 represents significant improvements in AI capabilities:

- **Hybrid Reasoning**: Both models can toggle between quick responses and extended thinking, but Claude 4 appears to do this more efficiently.
- **Speed vs. Depth**: Claude 4 achieves a better balance between processing speed and reasoning depth, which is why our tests show it completing tasks in roughly half the time of Claude 3.7.
- **Practical Benefits**: The speed improvements in Claude 4 make it more practical for real-time applications and complex workflows, while still maintaining high-quality outputs.
- **Cost Efficiency**: Since extended thinking uses more tokens (which affects pricing), Claude 4's more efficient reasoning process can potentially lead to cost savings.


## Troubleshooting

- **API Key Error**: Verify that your API key is correct and active.
- **Truncated response**: Increase `max_tokens` to get longer responses.
- **Slow response**: Complex questions take more time to process.
