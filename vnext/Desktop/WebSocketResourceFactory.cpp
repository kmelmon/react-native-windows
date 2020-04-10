// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"

#include <WinRTWebSocketResource.h>
#include "BeastWebSocketResource.h"

using std::make_shared;
using std::shared_ptr;
using std::string;

namespace Microsoft::React {
#pragma region IWebSocketResource static members

/*static*/
shared_ptr<IWebSocketResource>
IWebSocketResource::Make(const string &urlString, bool legacyImplementation, bool acceptSelfSigned) {
  if (!legacyImplementation) {
    std::vector<winrt::Windows::Security::Cryptography::Certificates::ChainValidationResult> certExceptions;
    if (acceptSelfSigned) {
      certExceptions.emplace_back(
          winrt::Windows::Security::Cryptography::Certificates::ChainValidationResult::Untrusted);
      certExceptions.emplace_back(
          winrt::Windows::Security::Cryptography::Certificates::ChainValidationResult::InvalidName);
    }
    return make_shared<WinRTWebSocketResource>(urlString, certExceptions);
  } else {
    Url url(urlString);

    if (url.scheme == "ws") {
      if (url.port.empty())
        url.port = "80";

      return make_shared<Beast::WebSocketResource>(std::move(url));
    } else if (url.scheme == "wss") {
      if (url.port.empty())
        url.port = "443";

      return make_shared<Beast::SecureWebSocket>(std::move(url));
    } else {
      throw std::invalid_argument((string("Incorrect URL scheme: ") + url.scheme).c_str());
    }
  }
}

#pragma endregion IWebSocketResource static members
} // namespace Microsoft::React
