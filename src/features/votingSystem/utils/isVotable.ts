import TipEntity from '../../tipManagement/types/TipEntity';

function isVotable(tip: TipEntity): boolean {
  if (tip.status === 'draft' || (tip.downVotes < -3 && tip.upVotes < 3)) {
    return false;
  }

  return true;
}

export default isVotable;
