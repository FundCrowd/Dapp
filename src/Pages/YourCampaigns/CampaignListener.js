import {getLogsForFilter} from "../../Utilities/Metamask";
import {convertAddressToTopic, convertToTopic} from "../../Utilities/util";
import {
    CampaignCreatedEventSignature, CampaignEndedEventSignature, CampaignFactoryAddress, CampaignStartedEventSignature,
    CampaignSucceededEventSignature, CampaignFundedEventSignature, CampaignFailedEventSignature,
    CampaignRefundEventSignature, CampaignWithdrawEventSignature, CampaignTaggedEventSignature
} from "../../Utilities/Constants";

// Gets the newest created campaigns
export const CampaignCreatedListener = (address) => {

	// If the address param is undef, get all instead of just the matching for creator
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  return getLogsForFilter(CampaignCreatedEventSignature,[null, queryableAddr],CampaignFactoryAddress);
};

// Gets the most recent started
export const CampaignStartedListener = (address) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  return getLogsForFilter(CampaignStartedEventSignature,[queryableAddr],CampaignFactoryAddress);
};

// Gets the most recently funded campaign
export const CampaignFundedListener = (address, sender) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  const queryableSender = (sender ? convertAddressToTopic(sender) : null);
  return getLogsForFilter(CampaignFundedEventSignature,[queryableAddr, queryableSender],CampaignFactoryAddress);
};

// Gets the newest ended campaigns
export const CampaignEndedListener = (address) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  return getLogsForFilter(CampaignEndedEventSignature,[queryableAddr],CampaignFactoryAddress);
};

// Gets the most recent Failed
export const CampaignFailedListener = (address) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  return getLogsForFilter(CampaignFailedEventSignature,[queryableAddr],CampaignFactoryAddress);
};

// Gets the newest successfully funded campaigns
export const CampaignSucceededListener = (address) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  return getLogsForFilter(CampaignSucceededEventSignature,[queryableAddr],CampaignFactoryAddress);
};

// Gets the newest refunded campaigns
export const CampaignRefundListener = (address, sender) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  const queryableSender = (sender ? convertAddressToTopic(sender) : null);
  return getLogsForFilter(CampaignRefundEventSignature,[queryableAddr,queryableSender],CampaignFactoryAddress);
};

// Gets the newest Withdraw campaigns
export const CampaignWithdrawListener = (address, creator) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  const queryableCreator = (creator ? convertAddressToTopic(creator) : null);
  return getLogsForFilter(CampaignWithdrawEventSignature,[queryableAddr,queryableCreator],CampaignFactoryAddress);
};

// Gets the newest tagged campaigns
export const CampaignTaggedListener = (address, tag, value) => {
  const queryableAddr = (address ? convertAddressToTopic(address) : null);
  const queryableTag = (tag ? convertToTopic(tag) : null);
  const queryableValue = (value ? convertToTopic(value) : null);
  return getLogsForFilter(CampaignTaggedEventSignature,[queryableAddr,queryableTag,queryableValue],CampaignFactoryAddress);
};

export const DiscoverCategories = {
  "created": CampaignCreatedListener, 
  "started": CampaignStartedListener,
  "funded": CampaignFundedListener,
  "ended": CampaignEndedListener,
  "failed": CampaignFailedListener,
  "succeeded": CampaignSucceededListener,
  "refund": CampaignRefundListener,
  "withdraw": CampaignWithdrawListener,
  "tagged": CampaignTaggedListener
}