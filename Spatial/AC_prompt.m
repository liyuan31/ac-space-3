function [sub_no,cb_no,num_blocks] = AC_prompt()
%AC_SPACE_PROMPT Summary of this function goes here
%   Detailed explanation goes here
prompt = {'Participant code:','Counterbalance code:','Number of Blocks:',};  % Get input before starting
dlg_title = 'Participant information';
num_lines= 1;

sub = 0;
for sub = 1:98
    if ~exist(strcat('./ACVS/Data/Data_AdaptChoice_', num2str(sub), '.txt'))
        break;
    end
end

defaults = {num2str(sub),num2str(sub),'3'};
answer = inputdlg(prompt,dlg_title,num_lines,defaults);
% Caution: consistent with Irons version, sub_no is treated as String
% across the code
sub_no = answer{1};
cb_no = str2num(answer{2});
num_blocks = str2num(answer{3});
end